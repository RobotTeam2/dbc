<?php
namespace dbc\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
class HomeController extends Controller
{
    //
    const KEY = '/dbc/speed';
    public function index() {
        try {
            $speed = Redis::get(self::KEY);
            return view('home', ['speed' => $speed]);
        }catch(\Exception $e){
            var_dump($e->getMessage());
        }
        return view('home', ['speed' => 100]);
    }
}
