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
            return view('welcome', ['speed' => $speed]);
        }catch(\Exception $e){
            Redis::set(self::KEY,'50');
            var_dump($e->getMessage());
        }
        return view('welcome', ['speed' => '50']);
    }
}
