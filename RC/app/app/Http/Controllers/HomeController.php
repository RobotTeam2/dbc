<?php
namespace dbc\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
class HomeController extends Controller
{
    //
    const KEY = '/dbc/speed';
    public function index() {
        $speed = Redis::get(self::KEY);
        if(!isset($speed)) {
            $speed = 100;
        }
        return view('home', ['speed' => $speed]);
    }
}
