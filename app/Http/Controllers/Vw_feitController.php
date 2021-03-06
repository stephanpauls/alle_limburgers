<?php

namespace App\Http\Controllers;
use App\Vw_feit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Illuminate\Database\Query\Builder;
use Google_Client;
use Google_Service_Drive;
use Imagick;

class Vw_feitcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$feiten = Feit::all();
//        $feiten = DB::table('feit')->select('feittype')->distinct()->orderBy('feittype','asc')->get();
//        $subtypes = DB::table('feit')->select('feitsubtype')->distinct()->orderBy('feitsubtype','asc')->get();
//        $rollen = DB::table('pers')->select('rol')->distinct()->orderBy('rol','asc')->get();
//        $authorities = DB::table('persd')->select('authority')->distinct()->orderBy('authority','asc')->get();
        
        return view('feiten.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
    public function store(Request $request)
    {
        $queryPers = false;
        $queryAuthority = false;

        $lijst = $request->input('lijst');
        if ($lijst == 'rollen') {
            $result = DB::table('pers')->select('rol')->distinct()->orderBy('rol','asc')->get();
        } else if ($lijst == 'authorities') {
            $result = DB::table('persd')->select('authority')->distinct()->orderBy('authority','asc')->get();
        } else if ($lijst == 'feittype') {
            $result = DB::table('mv_feit_types')->select('feittype')->get();
        } else if ($lijst == 'subtype') {
            $result = DB::table('mv_feit_subtypes')->select('feitsubtype')->get();
        } else if ($lijst == 'bron') {
            $result = DB::table('mv_bronnen')->select('categorie')->get();
        } else if ($lijst == 'soort') {
            $result = DB::table('mv_soorten')->select('soort')->get();
        } else if ($lijst == 'oobjtype') {
            $result = DB::table('mv_oobjtypes')->select('oobjtype')->get();
        } else if ($lijst == 'zoekFeit') {
            $query = DB::table('vw_feit');
            $filter = $request->input('filter');
            $query->where('feittype','ilike','%'.$filter.'%');
            $result = $query->select('vw_feit.feittype')->distinct()->limit(200)->get();
        } else if ($lijst == 'zoekSubtype') {
            $query = DB::table('vw_feit');
            $filter = $request->input('filter');
            $query->where('feitsubtype','ilike','%'.$filter.'%');
            $result = $query->select('vw_feit.feitsubtype')->distinct()->limit(200)->get();
        } else if ($lijst == 'detail') {
            $pers_id = $request->input('pers_id');
            $feit_id = $request->input('feit_id');
/*            
            $query = DB::table('vw_feit-pers');
            $query->join('vw_feit','vw_feit.feit_id', '=','vw_feit-pers.feit_id');            
            $query->join('vw_feit-persd','vw_feit.feit_id', '=','vw_feit-pers.feit_id');            
            $query->join('vw_feit-bron','vw_feit.bron_id', '=','vw_feit-bron.bron_id');            
            $query->where('vw_feit-pers.pers_id',$pers_id);
            $query->where('vw_feit-pers.feit_id',$feit_id);
            $query->where('vw_feit-persd.feit_id',$feit_id);
            $result = $query->select('vw_feit-bron.gemeente','vw_feit-bron.plaats','vw_feit-bron.omschrijving','vw_feit-pers.naam','vw_feit-pers.voornamen','vw_feit.*')->limit(1)->get();
*/            
            $query = DB::table('feit');
            $query->where('feit.feit_id',$feit_id);
            $result = $query->select('metadata')->get();
        } else if ($lijst == 'verwijder_file') {
            $remFile = $request->input('filepathJpg');
            $remFileOrig = $request->input('filepathOrig');
            unlink($remFile) or die("Couldn't delete file");
            if ($remFile != $remFileOrig) {
                unlink($remFileOrig) or die("Couldn't delete file");
            }
        } else if ($lijst == 'file') {
            $adacode = $request->input('adacode');
            $client = new \Google_Client();

            $client->setApplicationName('Google Drive API PHP Quickstart');
            $client->setScopes(Google_Service_Drive::DRIVE_METADATA_READONLY);
            $client->setAuthConfig('client_id.json');
            $client->setAccessType('offline');
            $client->setRedirectUri('http://' . $_SERVER['HTTP_HOST'] . '/oauth2callback.php');
            $client->setApprovalPrompt('force');   
            
            if (file_exists('credentials.json')) {
                $accessToken = json_decode(file_get_contents('credentials.json'), true);
                $client->setAccessToken($accessToken);     
                if ($client->isAccessTokenExpired()) {
                        $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
                        file_put_contents('credentials.json', json_encode($client->getAccessToken()));
                }            
                $service = new Google_Service_Drive($client);
                $q = 'name contains \''.$adacode.'\'';
                $optParams = array(
                    'includeTeamDriveItems'=> true,
                    'q' => $q,
                    'supportsTeamDrives' => true,
                    'pageSize' => 1,
                    'fields' => 'nextPageToken, files(id, name)'
                );
                $results = $service->files->listFiles($optParams);
                foreach ($results->getFiles() as $file) {
                    $href = 'https://drive.google.com/open?id='; 
                    $href .= $file->getId();
                    $result[0] = $href;
                    $file->getMimeType();
                    $contentUrl = $file->getWebContentLink();
                    $webcontentlink = "https://docs.google.com/uc?id=".$file->getId()."&amp;export=download";
/*
                    if ((substr($file->getName(),(strpos($file->getName(),'.')+1)) === ("tiff")) ||
                        (substr($file->getName(),(strpos($file->getName(),'.')+1)) === ("pdf"))) {
 * 
 */
                    $response = $service->files->get($file->getId(), array('alt' => 'media'));
                    $content = $response->getBody()->getContents();      
                    ini_set('memory_limit', '-1');  
                    set_time_limit (30);
                    file_put_contents($file->getName(),$content);
// met imagick php module en windows omgeving      
                    /*
                    $image = new \Imagick(getcwd()."\\".$file->getName());
                    $naam = substr($file->getName(),0,(strpos($file->getName(),'.')));
                    $image->writeImage(getcwd()."\\".$naam.".jpg");
                    $result[0]=$naam.".jpg";
                    $result[1]=getcwd()."\\".$naam.".jpg";
                    $result[2]=getcwd()."\\".$file->getName();
                     * 
                     */
//met image magick op aezel server en command calls via exec
                    
                    $naam = substr($file->getName(),0,(strpos($file->getName(),'.')));
                    $result[0]=$naam.".jpg";
                    $result[1]=getcwd()."/".$naam.".jpg";
                    $result[2]=getcwd()."/".$file->getName();
                    $imagick = "/usr/local/bin/convert ".getcwd()."/".$file->getName()." ".getcwd()."/".$naam.".jpg";
                    exec( $imagick, $output );
 

                    break;
                }
            } else {
                $result[0] = 'www.hbvl.be';
            }
        } else {
        
            $query = DB::table('vw_feit');
            $query->leftJoin('vw_feit-pers','vw_feit.feit_id', '=','vw_feit-pers.feit_id');
            $query->leftJoin('vw_feit-bron','vw_feit.feit_id', '=','vw_feit-bron.feit_id');
                
            $types = $request->input('feit');
            $subtypes = $request->input('subtype');
            $others = $request->input('other');

            foreach ($others as $other)   {
                if (($other['term'] == 'toponiem') || ($other['term'] == 'soort') || ($other['term'] == 'oobjtype')) {
                    $query->leftJoin('oobj', 'vw_feit.feit_id','=','oobj.feit_id');
                    break;
                }
            }
            
            $index = 1; 
            $q = "";
            $first = true;

            if ($types != null) {
                $first = false;
                foreach ($types as $type){
                    if ($index == 1){
                       $q.=  ' (feittype = \''.$type.'\'';
                    } else {
                        $q.= ' or feittype = \''.$type.'\'';
                    }
                    $index++;
                }
                $q.= ')';
            }
            $index = 1;

            if($subtypes != null) {
                $first = false;
                foreach ($subtypes as $type){
                    if ($index == 1) {
                        if ($types != null) {
                            $q.=' and (feitsubtype = \''.$type.'\'';
                        } else {
                            $q.=' (feitsubtype = \''.$type.'\'';
                        }
                    } else {
                        $q.=' or feitsubtype = \''.$type.'\'';
                    }
                    $index++;            
                }
                $q.= ')';
            }

            if ($others != null) {
            
                foreach ($others as $other) {
                    $other['filter'] = urldecode($other['filter']);
                    if ($other['term'] == 'plaats') $other['term'] = '"vw_feit"."plaats"';
                    if ($other['term'] == 'omschrijving') $other['term'] = '"vw_feit-bron"."omschrijving"';
                    if (
                        ('naam' == $other['term'])
                        ||('voornamen' == $other['term'])
                        ||('datum' == $other['term']) 
                        ||('rol' == $other['term'])
                       ) {
                        if ($queryPers == false) {
                            $queryPers = true;
                        }
                    } else if ('authority' == $other['term']) {
                        if ($queryAuthority == false) {
                         $queryAuthority = true;
                         $query->join('vw_feit-persd','vw_feit-pers.pers_id', '=','vw_feit-persd.pers_id');
                        }
                    }

                    if ('bracket' == ($other['term'])) {
                        if ($other['bracket'] == '(') {
                            if ($first == false) { 
                                if ($other['poort'] == 'NOT') {$q .= ' AND';}
                                $q .= ' '.$other['poort'];
                                $first = true;
                           }
                        }
                        $q .= ' '.$other['bracket'];
                    } else {
                        if ($first == false) { 
                            if ($other['poort'] == 'NOT') {$q .= ' AND';}
                            $q .= ' '.$other['poort'];
                        } else {
                            $first = false;
                        }
                        if ('authority' == $other['term']) {
                            $other['auth'] = urldecode($other['auth']);
                            $q.= '(authority = \''.$other['auth'].'\'';
                            $other['term'] = 'waarde';
                            if ('waarde' == $other['term']) {
                                if(strpos($other['auth'],'plaats') != false) {
                                    if (($other['operator']) == 'bevat') {
                                        $q.= ' and lower(waarde) like lower(\'%'.$other['filter'].'%\')';
                                    } else if (($other['operator']) == 'bevat_exact') {
                                        $q.= ' and lower(waarde) = lower(\''.$other['filter'].'\')';
                                    } else if (($other['operator']) == 'begint') {
                                        $q.= ' and lower(waarde) like lower(\''.$other['filter'].'%\')';                        
                                    }
                                } else if (strpos($other['auth'],'datum') != false) {
                                    if (($other['operator']) == 'vanaf') {
                                        $q.= ' and waarde > \''.$other['filter'].'\'';
                                    } else if (($other['operator']) == 'totmet') {
                                        $q.= ' and waarde < \''.$other['filter'].'\'';
                                    } else {
                                        $q.= ' and waarde = \''.$other['filter'].'\'';
                                    }
                                } else {
                                    if (($other['operator']) == 'bevat') {
                                        $q.= ' and lower(waarde) like lower(\'%'.$other['filter'].'%\')';
                                    } else if (($other['operator']) == 'bevat_exact') {
                                        $q.= ' and lower(waarde) = lower(\''.$other['filter'].'\')';
                                    } else if (($other['operator']) == 'begint') {
                                        $q.= ' and lower(waarde) like lower(\''.$other['filter'].'%\')';                        
                                    }
                                }
                                $q.= ')';
                            }                            
                        } else {
                            if (($other['operator']) == 'bevat') {
                                $q.= ' lower('.$other['term'].') like lower(\'%'.$other['filter'].'%\')';
                            } else if (($other['operator']) == 'bevat_exact') {
                                $q.= ' lower('.$other['term'].') = lower(\''.$other['filter'].'\')';
                            } else if (($other['operator']) == 'begint') {
                                $q.= ' lower('.$other['term'].') like lower(\''.$other['filter'].'%\')';
                            } else if (($other['operator']) == 'vanaf') {
                                $q.= ' '.$other['term'].' > '.$other['filter'];
                            } else if (($other['operator']) == 'totmet') {
                                $q.= ' '.$other['term'].' < '.$other['filter'];
                            } else {
                                $q.= ' '.$other['term'].' = '.$other['filter'];
                            }
                        }
                    }   
                }
            }
            $query->whereRaw($q);            
//            $result = $query->select('vw_feit-pers.*','vw_feit.feittype','vw_feit.plaats','vw_feit.tekst','vw_feit.datum','vw_feit-bron.omschrijving','oobj.oobjtype','oobj.soort','oobj.toponiem')->limit(200)->get();
            $result = $query->select('vw_feit.feit_id','vw_feit-pers.naam','vw_feit-pers.voornamen','vw_feit-pers.rol','vw_feit-pers.naam','vw_feit.feittype','vw_feit.plaats','vw_feit.tekst','vw_feit.datum','vw_feit-bron.omschrijving')->limit(200)->get();
        }
        return $result;
    }  
 
    /**
     * Display the specified resource.
     *
     * @param  \App\Feit  $feit
     * @return \Illuminate\Http\Response
     */
    public function show(Vw_feit $feit)
    {
        /*
        $feiten = DB::table('vw_feit')->where('feit_id',$feit->feit_id)->limit(100)->get();
        foreach ($feiten as $value) {
               $naam =  $value;
        }
         * 
         */
        $id = $feit->feit_id;
        return view('feiten.show',['feit_id'=>$feit->feit_id]);        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Feit  $feit
     * @return \Illuminate\Http\Response
     */
    public function edit(Vw_feit $feit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Feit  $feit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vw_feit $feit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Feit  $feit
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vw_feit $feit)
    {
        //
    }
    
    
    
}
