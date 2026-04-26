<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )

//? Sets up the session system for API routes -> saves the session in the session db table
    ->withMiddleware(function (Middleware $middleware): void {
    //? statefulApi() = enables cookie/session based auth for API routes (instead of stateless/JWT)
    $middleware->statefulApi();
    
    //? prepend StartSession = starts the session FIRST before any other middleware runs
    //? same concept as session_start() in vanilla PHP but automatic
    $middleware->api(prepend: [
        \Illuminate\Session\Middleware\StartSession::class,
    ]);
    
        //? skip CSRF token check for all /api/* routes (CSRF is for web forms, not APIs)
        //? Cross-Site Request Forgery -> hacker tricks user's browser to request on a website you already logged into.
    //* $middleware->validateCsrfTokens(except: ['api/*']);
})
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
