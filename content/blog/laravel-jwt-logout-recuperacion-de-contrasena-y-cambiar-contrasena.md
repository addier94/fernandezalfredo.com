---
title: 'Laravel JWT Logout, Login, Register, Confirmación de cuenta, Recuperación de Contraseña y cambiar contraseña'
description: 'Autenticación basado en JWT Reutilizando gran parte de la autenticacion de laravel'
date: 2021-05-04
timeToRead: 8
tags:
  - laravel
---

# Configuración e instalación JWT

Una vez que se tiene el proyecto de laravel instalado y configurado con la conexión a la base de datos, migramos las tablas `php artisan migrate`.
Ahora agregamos el paquete JWT en composer.json

```php
"tymon/jwt-auth": "^1.0.0-rc.5.1"
```

ejecutamos `composer update`, para modificar configuración por defecto de JWT package, publicamos el archivo de configuración que va a estar disponible en `config/jwt.php`

```php
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```

Generamos JWT_SECRET que se va generar en la variable de entorno `.env`

```php
php artisan jwt:secret
```

Como indica en la [Documentación](https://jwt-auth.readthedocs.io/en/develop/quick-start/) necesitamos implementar el interface `JWTSubject` en el modelo `User`

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
```

No olvidemos modificar la authenticación en `config/auth.php`

```php
    'defaults' => [
        'guard' => 'api',
        'passwords' => 'users',
    ],
    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'jwt',
            'provider' => 'users',
            'hash' => false,
        ],
    ],
```

# Registro verificación de usuario, y reenvio de verificación

Vamos a reutilizar la autenticación de Laravel, ejecutamos los siguientes lineas en la terminal

```php
composer require laravel/ui
```

```php
php artisan ui:controllers
```

Bien vamos a definir algunas Rutas en `route/api.php` y controlador para el registro del usuario `App/Http/Controllers/Auth/RegisterController`;

```php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;

Route::group(['middleware' => ['guest:api']], function () {
    Route::post('register', [RegisterController::class, 'register']);
});
```

```php
// controller for register
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    use RegistersUsers;

    protected function registered(Request $request, User $user)
    {
        return response()->json($user, 200);
    }
    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
```

Para añadir funcionalidad de verificación de Email configuramos la conexión a un servidor de correos por su puesto de pruebas, esto lo que hace es capturar la salida de envíos de email.
Para esta prueba voy a ocupar mailhog perfectamente puedes conectarlo con mailtrap

```php
MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=hello@tienda.com
MAIL_FROM_NAME="${APP_NAME}"
```

Cuando se hace el registro de un usuario, detrás de escenas se llama a la ruta con nombre `verification.verify` por ende vamos a crear esta ruta en `route/api.php`

```php
Route::group(['middleware' => ['guest:api']], function () {
    Route::post('register', [RegisterController::class, 'register']);
    Route::post('verification/verify/{user}', [VerificationController::class, 'verify'])->name('verification.verify');
    Route::post('verification/resend', [VerificationController::class, 'resend']);
});
```

En el modelo `User.php` vamos a implementar MustVerifyEmail y sobreescribir algunos métodos,
primero creamos una clase para la notificación que lo vamos a llamar VerifyEmail

```php
php artisan make:notification VerifyEmail
```

```php
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\VerifyEmail;

class User extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail);
    }
}
```

Vamos a sobreescribir en `App\Notifications\VerifyEmail` archivo anteriormente creado

```php
namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\URL;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Auth\Notifications\VerifyEmail as Notification;

class VerifyEmail extends Notification
{
    protected function verificationUrl($notifiable)
    {
        $appUrl = config('app.client_url', config('app.url'));

        $url = URL::temporarySignedRoute(
            'verification.verify',
            Carbon::now()->addMinutes(60),
            ['user' => $notifiable->id]
        );

        return str_replace(url('/api'), $appUrl, $url);
    }
}
```

Definamos una variable de entorno `config/app.php` para el cliente con el objetivo de obtener usuario verificado

```php
    'url' => env('APP_URL', 'http://localhost'),

    'client_url' => env('CLIENT_URL', 'http://localhost'),

    'asset_url' => env('ASSET_URL', null),
```

`.env`

```php
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:r048yxFfWPpUTg+IAVO4O6wMfEa7wAmB4d5CSj1gS1c=
APP_DEBUG=true
APP_URL=http://tiendaapi.test
CLIENT_URL=http://tiendaapi:3000
```

También necesitamos sobre escribir algunos métodos en `VerificationController.php`

```php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use App\Models\User;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('signed')->only('verify');
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }

    public function verify(Request $request, User $user)
    {
        // Check if the url is a valid signed url
        if(! \URL::hasValidSignature($request)){
            return response()->json(["errors" => [
                "message" => "Link de verificación inválido"
            ]], 422);
        }

        // Check if the user has already verified account
        if($user->hasVerifiedEmail()){
            return response()->json(["errors" => [
                "message" => "Email ya ha sido verificado"
            ]], 422);
        }

        $user->markEmailAsVerified();
        event(new Verified($user));

        return response()->json(['message' => 'Email ha sido verificado con éxito'], 200);
    }

    public function resend(Request $request)
    {
        $this->validate($request, [
            'email' => ['email', 'required']
        ]);

        $user = User::where('email', $request->email)->first();
        if(! $user) {
            return response()->json(["errors" => [
                "email" => "Usuario no encontrado con este email"
            ]], 422);
        }

        if($user->hasVerifiedEmail()){
            return response()->json(["errors" => [
                "message" => "Email ya ha sido verificado"
            ]], 422);
        }

        $user->sendEmailVerificationNotification();

        return response()->json(['status' => "Link de verificación reenviado"]);
    }
}
```

## Autenticación con Email y Contraseña

Definamos una ruta `login` en `route/api.php`
con su respectivo controlador, en el que vamos a sobreescribir algunos métodos

```php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\Auth\LoginController;

Route::group(['middleware' => ['guest:api']], function () {
    Route::post('register', [RegisterController::class, 'register']);
    Route::post('verification/verify/{user}', [VerificationController::class, 'verify'])->name('verification.verify');
    Route::post('verification/resend', [VerificationController::class, 'resend']);
    Route::post('login', [LoginController::class, 'login']);
});
```

```php
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    public function attemptLogin(Request $request): bool
    {
        // attempt to issue a token to the user based on the login credentials
        $token = $this->guard()->attempt($this->credentials($request));

        if( ! $token){
            return false;
        }

        // Get the authenticated user
        $user = $this->guard()->user();

        if($user instanceof  MustVerifyEmail && ! $user->hasVerifiedEmail()){
            return false;
        }

        // set the user's token
        $this->guard()->setToken($token);
        return true;
    }

    protected function sendLoginResponse(Request $request)
    {
        $this->clearLoginAttempts($request);

        // get the token from the authentication guard (JWT)
        $token = (string)$this->guard()->getToken();

        // extract the expiry date of the token
        $expiration = $this->guard()->getPayload()->get('exp');

        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $expiration
        ]);
    }

    protected function sendFailedLoginResponse()
    {
        $user = $this->guard()->user();

        if($user instanceof MustVerifyEmail && ! $user->hasVerifiedEmail()) {
            return response()->json(["errors" => [
                "verification" => "Necesitas verificar tu email"
            ]]);
        }

        throw ValidationException::withMessages([
            $this->username() => "Credencial de autenticación invalido"
        ]);
    }
}
```

## Logout

En `route/api.php` agreguemos un grupo de rutas para usuarios autenticados y su método`logout` en `LoginController`

```php
use App\Http\Controllers\Auth\LoginController;

Route::group(['middleware' => ['auth:api']], function() {
    Route::post('logout', [LoginController::class, 'logout']);
});
```

```php
    public function logout()
    {
        $nameUser = $this->guard()->user()->name;
        $this->guard()->logout();

        return response()->json(['message' => "Vuelva pronto {$nameUser}"]);
    }
```

## Obteniendo usuario autenticado

Creemos una ruta pública `route/api.php` y su respectivo controlador

```php
// Public routes
Route::get('me', [MeController::class, 'getMe']);
```

```php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MeController extends Controller
{
    public function getMe()
    {
        if(auth()->check()){
            return response()->json(["user" => auth()->user()], 200);
        }
        return response()->json(null, 200);
    }
}
```

## Solicitud para recuperar contraseña y cambiar contraseña

Vamos a definir dos rutas en `route/api.php`

```php
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;

Route::group(['middleware' => ['guest:api']], function () {
    Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail']);
    Route::post('password/reset', [ResetPasswordController::class, 'reset'])->name('password.reset');
});
```

Vamos a sobreescribir el método `sendPasswordResetNotification` en modelo `User.php`

```php
use Illuminate\Auth\Notifications\ResetPassword;

    public function  sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPassword($token));
    }
```

Creémos una clase para sobreéscribir el metodo `toMail` en la clase `Illuminate\Auth\Notifications\ResetPassword`

```php
php artisan make:notification PasswordReset
```

```php
namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Auth\Notifications\ResetPassword as Notification;
use Illuminate\Notifications\Messages\MailMessage;

class PasswordReset extends Notification
{
    public function toMail($notifiable)
    {
        $url = url(config('app.client_url').'/password/reset/'.$this->token).'?email='.urlencode($notifiable->email);
        return (new MailMessage)
            ->line('está recibiendo este correo electrónico porque recibimos una solicitud de restablecimiento de contraseña para su cuenta')
            ->action('Reset Password', $url)
            ->line('Si no solicitó un restablecimiento de contraseña, no es necesario realizar ninguna otra acción.');
    }
}
```

Tambien vamos a sobreéscribir algunos métodos en `ForgotPasswordController.php` y `ResetPasswordController.php`

```php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    use SendsPasswordResetEmails;

    protected function sendResetLinkResponse(Request $request, $response)
    {
        return response()->json(['status' => trans($response)], 200);
    }

    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        return response()->json(['email' => trans($response)], 422);
    }
}
```

```php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;

class ResetPasswordController extends Controller
{
    use ResetsPasswords;

    protected function sendResetResponse(Request $request, $response)
    {
        return response()->json(['status' => trans($response)], 200);
    }

    protected function sendResetFailedResponse(Request $request, $response)
    {
        return response()->json(['email' => trans($response)], 200);
    }
}
```
