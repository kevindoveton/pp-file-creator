<?php
date_default_timezone_set("Australia/Adelaide") ;
# Include the Dropbox SDK libraries
require_once "Dropbox/autoload.php";
use \Dropbox as dbx;

$accessToken = "IjbZ2CtGxBMAAAAAAAAga8zEd-tY6H-RnrKjZq9kepb71l2xK_WFqtqBjdbodBPF";
$dbxClient = new dbx\Client($accessToken, "PHP-Example/1.0");
$accountInfo = $dbxClient->getAccountInfo();

if ($_POST['go'] != '') {
	require_once('functions.php');
	$count = 1;

	$out = headers();

	$preacher = $_POST['pName'];
	$date = $_POST['pDate'];
	$date = str_replace("/", "-", $date);
	$date = DateTime::createFromFormat('d-m-Y', $date);
	$date = date_format($date, 'Ymd');
	$fileName = $date.'-'.$preacher.'.pro5';

	$out = $out.blankslide('0', 'blank');

	for ($i = 1; $i < 100; $i++)
	{
		if (isset($_POST['s'.$i]))
		{
			$currentType = $_POST['s'.$i];
			$currentText = $_POST['field'.$i];
			$currentName = substr($currentText, 0, 12);
			$currentTranslation = $_POST['t'.$i];
			$currentImageName = $_POST['i'.$i];

			switch ($currentType)
			{
				case 'blank':
					$out = $out.blankslide($count, 'blank');
					$count++;
					break;

				case 'text':
					$out = $out.textslide($count, $currentName, $currentText);
					$count++;
					break;

				case 'passage':
					$json = file_get_contents('http://www.rdec.com.au/familycentre/search.php?ref='.urlencode($currentText).'&&version='.urlencode($currentTranslation));
					$data = json_decode($json);

					foreach($data as $d)
					{
						$out = $out.verseslide($count, // index
										($d->book.' '.$d->chapter.':'.$d->verse), // label
										$d->verse, // verse number
										($d->book.' '.$d->chapter.':'.$d->verse), // footer
										$d->text, // slide text
										$d->translation); // translation
						$count++;
					}

					break;

				case 'image':
					$dbxClient->uploadFile("/CFC Media/5. This Week Content/".$currentImageName, dbx\WriteMode::add(), $file);

				default:
					$out = $out.blankslide($count, 'blank');
					$count++;
					break;
			}
		}
	}

	$out = $out.closure();


	file_put_contents($fileName, $out);
	$file = fopen($fileName,'r');
	//echo $out;
	echo 'success.';

	// Upload File
	$dbxClient->uploadFile("/CFC Media/5. This Week Content/".$fileName, dbx\WriteMode::add(), $file);
	
	// Delete file
	unlink($fileName);

}
else header('Location: ./');
