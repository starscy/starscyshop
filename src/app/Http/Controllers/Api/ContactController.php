<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
//use App\Mail\ContactFormMail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:5000',
        ]);

        // Здесь можно отправить письмо
//         Mail::to('karavaev199030@gmail.com')->send(new ContactFormMail($request->all()));

        // Пока просто возвращаем успех (для теста)
        return response()->json(['message' => 'Сообщение отправлено!']);
    }
}
