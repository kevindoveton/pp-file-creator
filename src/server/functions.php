<?php
// header("Content-Type: text/plain");

// echo make_uuid();

// echo headers();
// echo blankslide('0', '2');
// echo verseslide('0', 'kev 1:2', '2', 'kevin 1:2', 'for thy kevin says hello and this is a very long verse that should most certainly go over more than one line', 'KEV');
// echo blankslide('1', 'hi');
// echo textslide('2','text','listen to kev');
// echo textslide('3', 'mumsy','hello says the mumsy');
// echo closure();





function make_uuid()
{
	
/*
2D015183- (8)
FC70-
4BBC-
8471-
09242E2AABBF (12)
*/

	$uuid1arr = str_split(uniqid('', true));
	$uuid2arr = str_split(uniqid('', true));
	
	$uuid = "";
	
	for ($i = 0; $i < 8; $i++)
	{
		$uuid = $uuid.$uuid1arr[$i];
	}
	
	$uuid = $uuid."-";
	
	for ($i = 7; $i < 11; $i++)
	{
		$uuid = $uuid.$uuid1arr[$i];
	}
	
	$uuid = $uuid."-";
	
	for ($i = 11; $i < 14; $i++)
	{
		$uuid = $uuid.$uuid1arr[$i];
	}
	
	$uuid = $uuid . $uuid1arr[15] . "-";
	
	for ($i = 16; $i < 20; $i++)
	{
		$uuid = $uuid. $uuid1arr[$i];
	}
	
	$uuid = $uuid."-";
	
	for ($i = 15; $i < 23; $i++)
	{
		$uuid = $uuid.$uuid2arr[$i];
	}
	
	for ($i = 10; $i < 14; $i++)
	{
		$uuid = $uuid.$uuid2arr[$i];
	}
	
	return strtoupper($uuid);
}


function rtfdata_bibleverse($verse, $verseNumber, $verseRef, $verseTranslation)
{
	$slide = "{\\rtf1\\ansi\\ansicpg1252\\cocoartf1347\\cocoasubrtf570"."\n".
	"\\cocoascreenfonts1{\\fonttbl\\f0\\fnil\\fcharset0 HelveticaNeue-Light;}"."\n".
	"{\\colortbl;\\red255\\green255\\blue255;}"."\n".
	"\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc"."\n".
	"\n".
	"\\f0\\fs48 \\cf1 \\super2 " . $verseNumber . "\n".
	"\\fs96 \\nosupersub ". $verse . "\\" . "\n" .
	"\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qr" . "\n" .
	"\\cf1 " . $verseRef . " (" . $verseTranslation . ")}";
	
	
	return base64_encode($slide);
}

function rtfdata_text($text)
{
	$slide = "{\\rtf1\\ansi\\ansicpg1252\\cocoartf1347\\cocoasubrtf570" . "\n" .
"\\cocoascreenfonts1{\\fonttbl\\f0\\fnil\\fcharset0 HelveticaNeue-Light;}" . "\n" .
"{\\colortbl;\\red255\\green255\\blue255;}" . "\n" .
"\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc" . "\n".

"\\f0\\fs96 \\cf1  ". $text . "}";

	return base64_encode($slide);
}

function headers()
{
	$header = '<RVPresentationDocument height="720" width="1280" versionNumber="500" docType="0" creatorCode="1349676880" lastDateUsed="2015-08-08T22:38:35" usedCount="0" category="Speaker" resourcesDirectory="" backgroundColor="0 0 0 1" drawingBackgroundColor="0" notes="" artist="" author="" album="" CCLIDisplay="0" CCLIArtistCredits="" CCLISongTitle="" CCLIPublisher="" CCLICopyrightInfo="" CCLILicenseNumber="" chordChartPath="">
	<timeline timeOffSet="0" selectedMediaTrackIndex="0" unitOfMeasure="60" duration="0" loop="0">
		<timeCues containerClass="NSMutableArray" />
		<mediaTracks containerClass="NSMutableArray" />
	</timeline>
	<bibleReference containerClass="NSMutableDictionary" />
	<_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100" />
	<groups containerClass="NSMutableArray">
		<RVSlideGrouping name="" uuid="3AFCBE29-AC33-496E-A181-E7C4B4618FCB" color="0 0 0 0" serialization-array-index="0">
			<slides containerClass="NSMutableArray">';
	
	return $header;
}

function closure()
{
	$closure = '
				</slides>
			</RVSlideGrouping>
		</groups>
	<arrangements containerClass="NSMutableArray">
		<RVSongArrangement name="New Arrangement" uuid="8DD67BB3-30A2-4859-92CC-6B34181ADE5F" color="0 0 0 0" serialization-array-index="0">
			<groupIDs containerClass="NSMutableArray">
				<NSMutableString serialization-native-value="3AFCBE29-AC33-496E-A181-E7C4B4618FCB" serialization-array-index="0" />
			</groupIDs>
		</RVSongArrangement>
	</arrangements>
</RVPresentationDocument>';

	return $closure;
	
}


function slide($sName, $sType, $sText, $verse, $verseNumber, $verseRef, $verseTranslation, $sIndex)
{
	if ($sType == "text")
	{
		$slide = '<RVDisplaySlide backgroundColor="0 0 0 1" enabled="1" highlightColor="0 0 0 0" hotKey="" label="'.$sName.'" notes="" slideType="1" sort_index="'.$sIndex.'" UUID="'.make_uuid().'" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="'.$sIndex.'">
						<cues containerClass="NSMutableArray" />
						<displayElements containerClass="NSMutableArray">
							<RVTextElement displayDelay="0" displayName="" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="0 0 0 0" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="'.rtfdata_text($sText).'" revealType="0" serialization-array-index="0">
								<_-RVRect3D-_position x="138.9339" y="51.33035" z="0" width="1002.132" height="617.3393" />
								<_-D-_serializedShadow containerClass="NSMutableDictionary">
									<NSMutableString serialization-native-value="{5, -5}" serialization-dictionary-key="shadowOffset" />
									<NSNumber serialization-native-value="0" serialization-dictionary-key="shadowBlurRadius" />
									<NSColor serialization-native-value="0 0 0 0.3333333432674408" serialization-dictionary-key="shadowColor" />
								</_-D-_serializedShadow>
								<stroke containerClass="NSMutableDictionary">
									<NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey" />
									<NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey" />
								</stroke>
							</RVTextElement>
						</displayElements>
						<_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100" />
					</RVDisplaySlide>';
	}
	
	else if ($sType == "verse")
	{
		$slide = '<RVDisplaySlide backgroundColor="0 0 0 1" enabled="1" highlightColor="0 0 0 0" hotKey="" label="'.$sName.'" notes="" slideType="1" sort_index="'.$sIndex.'" UUID="'.make_uuid().'" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="'.$sIndex.'">
						<cues containerClass="NSMutableArray" />
						<displayElements containerClass="NSMutableArray">
							<RVTextElement displayDelay="0" displayName="" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="0 0 0 0" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="'.rtfdata_bibleverse($verse, $verseNumber, $verseRef, $verseTranslation).'" revealType="0" serialization-array-index="0">
								<_-RVRect3D-_position x="138.9339" y="51.33035" z="0" width="1002.132" height="617.3393" />
								<_-D-_serializedShadow containerClass="NSMutableDictionary">
									<NSMutableString serialization-native-value="{5, -5}" serialization-dictionary-key="shadowOffset" />
									<NSNumber serialization-native-value="0" serialization-dictionary-key="shadowBlurRadius" />
									<NSColor serialization-native-value="0 0 0 0.3333333432674408" serialization-dictionary-key="shadowColor" />
								</_-D-_serializedShadow>
								<stroke containerClass="NSMutableDictionary">
									<NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey" />
									<NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey" />
								</stroke>
							</RVTextElement>
						</displayElements>
						<_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100" />
					</RVDisplaySlide>';
	}
	
	else //return blank
	{
		$slide = '<RVDisplaySlide backgroundColor="0 0 0 1" enabled="1" highlightColor="" hotKey="" label="'.$sName.'" notes="" slideType="1" sort_index="'.$sIndex.'" UUID="'.make_uuid().'" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="'.$sIndex.'">
					<cues containerClass="NSMutableArray" />
					<displayElements containerClass="NSMutableArray">
						<RVTextElement displayDelay="0" displayName="" locked="0" persistent="0" typeID="0" fromTemplate="1" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="0 0 0 0" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="eyB0ZjFcYW5zaVxhbnNpY3BnMTI1Mlxjb2NvYXJ0ZjEzNDdcY29jb2FzdWJydGY1NzANClxjb2NvYXNjcmVlbmZvbnRzMXsMb250dGJsDDAMbmlsDGNoYXJzZXQwIEhlbHZldGljYU5ldWUtTGlnaHQ7fQ0Ke1xjb2xvcnRibDsgZWQyNTVcZ3JlZW4yNTVcYmx1ZTI1NTt9DQpccGFyZAl4NTYwCXgxMTIwCXgxNjgwCXgyMjQwCXgyODAwCXgzMzYwCXgzOTIwCXg0NDgwCXg1MDQwCXg1NjAwCXg2MTYwCXg2NzIwXHBhcmRpcm5hdHVyYWxccWMNCg0KDDAMczQ4IFxjZjEgXHN1cGVyMiAkdmVyc2VOdW1iZXINCgxzOTYgb3N1cGVyc3ViICR2ZXJzZVwNClxwYXJkCXg1NjAJeDExMjAJeDE2ODAJeDIyNDAJeDI4MDAJeDMzNjAJeDM5MjAJeDQ0ODAJeDUwNDAJeDU2MDAJeDYxNjAJeDY3MjBccGFyZGlybmF0dXJhbFxxcg0KXGNmMSAkdmVyc2VSZWYoJHZlcnNlVHJhbnNsYXRpb24pfQ==" revealType="0" serialization-array-index="0">
							<_-RVRect3D-_position x="138.9339" y="51.33035" z="0" width="1002.132" height="617.3393" />
							<_-D-_serializedShadow containerClass="NSMutableDictionary">
								<NSMutableString serialization-native-value="{5, -5}" serialization-dictionary-key="shadowOffset" />
								<NSNumber serialization-native-value="0" serialization-dictionary-key="shadowBlurRadius" />
								<NSColor serialization-native-value="0 0 0 0.3333333432674408" serialization-dictionary-key="shadowColor" />
							</_-D-_serializedShadow>
							<stroke containerClass="NSMutableDictionary">
								<NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey" />
								<NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey" />
							</stroke>
						</RVTextElement>
					</displayElements>
				<_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100" />
				</RVDisplaySlide>';
	}
	
	return $slide;
}

function blankslide($sIndex, $sName = "BLANK")
{
	return slide($sName,'blank','','','','','', $sIndex); 
}

function verseslide($sIndex, $sName, $sVerseNumber, $sVerseReference, $sVerseText, $sVerseTranslation)
{
	return slide($sName, "verse", "", $sVerseText, $sVerseNumber, $sVerseReference, $sVerseTranslation, $sIndex);
}

function textslide($sIndex, $sName, $sText)
{
	return slide($sName, "text", $sText, "", "", "", "",$sIndex);
}



