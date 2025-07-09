// Standardization mappings for roaster names
const ROASTER_STANDARDIZATION: Record<string, string> = {
  // Counter Culture variations
  'counter culture': 'Counter Culture',
  'counterculture': 'Counter Culture',
  'counter culture coffee': 'Counter Culture',
  'counterculture coffee': 'Counter Culture',
  'counter culture coffee co': 'Counter Culture',
  'counterculture coffee co': 'Counter Culture',
  'counter culter': 'Counter Culture',
  
  // Stumptown variations
  'stumptown': 'Stumptown',
  'stumptown coffee': 'Stumptown',
  'stumptown coffee roasters': 'Stumptown',
  'stumptown coffee roasting': 'Stumptown',
  
  // Blue Bottle variations
  'blue bottle': 'Blue Bottle',
  'blue bottle coffee': 'Blue Bottle',
  'bluebottle': 'Blue Bottle',
  'bluebottle coffee': 'Blue Bottle',
  
  // Intelligentsia variations
  'intelligentsia': 'Intelligentsia',
  'intelligentsia coffee': 'Intelligentsia',
  'intelligentsia coffee & tea': 'Intelligentsia',

  // Percolate variations
  'perc': 'Perc',
  'perc coffee': 'Perc',
  
 // Black & White variations
  'black & white': 'Black & White',
  'black & white coffee': 'Black & White',
  'black & white coffee roasters': 'Black & White',
  'black and white': 'Black & White',
  
  // Verve variations
  'verve': 'Verve',
  'verve coffee': 'Verve',
  'verve coffee roasters': 'Verve',
  
  // Onyx variations
  'onyx': 'Onyx',
  'onyx coffee': 'Onyx',
  'onyx coffee lab': 'Onyx',

  //Café du Jour
  'cafe du jour': 'Café du Jour',
  'cafedujour': 'Café du Jour',
}

// Standardization mappings for origin names
const ORIGIN_STANDARDIZATION: Record<string, string> = {
  // Country variations
  'usa': 'United States',
  'united states': 'United States',
  'united states of america': 'United States',
  'us': 'United States',
  'u.s.': 'United States',
  'u.s.a.': 'United States',
  
  'uk': 'United Kingdom',
  'united kingdom': 'United Kingdom',
  'england': 'United Kingdom',
  'great britain': 'United Kingdom',
  'britain': 'United Kingdom',
  
  'canada': 'Canada',
  'canadian': 'Canada',
  
  'australia': 'Australia',
  'australian': 'Australia',
  
  // Coffee growing regions
  'ethiopia': 'Ethiopia',
  'ethiopian': 'Ethiopia',
  
  'colombia': 'Colombia',
  'colombian': 'Colombia',
  
  'brazil': 'Brazil',
  'brazilian': 'Brazil',
  
  'guatemala': 'Guatemala',
  'guatemalan': 'Guatemala',
  
  'costa rica': 'Costa Rica',
  'costa rican': 'Costa Rica',
  
  'honduras': 'Honduras',
  'honduran': 'Honduras',
  
  'nicaragua': 'Nicaragua',
  'nicaraguan': 'Nicaragua',
  
  'peru': 'Peru',
  'peruvian': 'Peru',
  
  'mexico': 'Mexico',
  'mexican': 'Mexico',
  
  'kenya': 'Kenya',
  'kenyan': 'Kenya',
  
  'tanzania': 'Tanzania',
  'tanzanian': 'Tanzania',
  
  'uganda': 'Uganda',
  'ugandan': 'Uganda',
  
  'rwanda': 'Rwanda',
  'rwandan': 'Rwanda',
  
  'burundi': 'Burundi',
  'burundian': 'Burundi',
  
  'sumatra': 'Sumatra',
  'indonesia': 'Indonesia',
  'indonesian': 'Indonesia',
  
  'java': 'Java',
  'javan': 'Java',
  
  'sulawesi': 'Sulawesi',
  'celebes': 'Sulawesi',
  
  'papua new guinea': 'Papua New Guinea',
  'png': 'Papua New Guinea',
  
  'vietnam': 'Vietnam',
  'vietnamese': 'Vietnam',
  
  'thailand': 'Thailand',
  'thai': 'Thailand',
  
  'india': 'India',
  'indian': 'India',
  
  'yemen': 'Yemen',
  'yemeni': 'Yemen',
  
  'jamaica': 'Jamaica',
  'jamaican': 'Jamaica',
  
  'dominican republic': 'Dominican Republic',
  'dominican': 'Dominican Republic',
  
  'haiti': 'Haiti',
  'haitian': 'Haiti',
  
  'puerto rico': 'Puerto Rico',
  'puerto rican': 'Puerto Rico',
  
  'hawaii': 'Hawaii',
  'hawaiian': 'Hawaii',
  
  'panama': 'Panama',
  'panamanian': 'Panama',
  
  'el salvador': 'El Salvador',
  'salvadoran': 'El Salvador',
  
  'ecuador': 'Ecuador',
  'ecuadorian': 'Ecuador',
  
  'bolivia': 'Bolivia',
  'bolivian': 'Bolivia',
  
  'venezuela': 'Venezuela',
  'venezuelan': 'Venezuela',
  
  'guyana': 'Guyana',
  'guyanese': 'Guyana',
  
  'suriname': 'Suriname',
  'surinamese': 'Suriname',
  
  'french guiana': 'French Guiana',
  'guyane': 'French Guiana',
  
  'paraguay': 'Paraguay',
  'paraguayan': 'Paraguay',
  
  'uruguay': 'Uruguay',
  'uruguayan': 'Uruguay',
  
  'argentina': 'Argentina',
  'argentine': 'Argentina',
  'argentinian': 'Argentina',
  
  'chile': 'Chile',
  'chilean': 'Chile',
  
  'madagascar': 'Madagascar',
  'malagasy': 'Madagascar',
  
  'zambia': 'Zambia',
  'zambian': 'Zambia',
  
  'zimbabwe': 'Zimbabwe',
  'zimbabwean': 'Zimbabwe',
  
  'malawi': 'Malawi',
  'malawian': 'Malawi',
  
  'mozambique': 'Mozambique',
  'mozambican': 'Mozambique',
  
  'angola': 'Angola',
  'angolan': 'Angola',
  
  'congo': 'Congo',
  
  'cameroon': 'Cameroon',
  'cameroonian': 'Cameroon',
  
  'ivory coast': 'Ivory Coast',
  'cote d\'ivoire': 'Ivory Coast',
  'ivorian': 'Ivory Coast',
  
  'ghana': 'Ghana',
  'ghanaian': 'Ghana',
  
  'nigeria': 'Nigeria',
  'nigerian': 'Nigeria',
  
  'sierra leone': 'Sierra Leone',
  'sierra leonean': 'Sierra Leone',
  
  'liberia': 'Liberia',
  'liberian': 'Liberia',
  
  'guinea': 'Guinea',
  'guinean': 'Guinea',
  
  'senegal': 'Senegal',
  'senegalese': 'Senegal',
  
  'mali': 'Mali',
  'malian': 'Mali',
  
  'burkina faso': 'Burkina Faso',
  'burkinabe': 'Burkina Faso',
  
  'niger': 'Niger',
  'nigerien': 'Niger',
  
  'chad': 'Chad',
  'chadian': 'Chad',
  
  'central african republic': 'Central African Republic',
  'central african': 'Central African Republic',
  
  'south sudan': 'South Sudan',
  'south sudanese': 'South Sudan',
  
  'sudan': 'Sudan',
  'sudanese': 'Sudan',
  
  'egypt': 'Egypt',
  'egyptian': 'Egypt',
  
  'morocco': 'Morocco',
  'moroccan': 'Morocco',
  
  'algeria': 'Algeria',
  'algerian': 'Algeria',
  
  'tunisia': 'Tunisia',
  'tunisian': 'Tunisia',
  
  'libya': 'Libya',
  'libyan': 'Libya',
  
  'somalia': 'Somalia',
  'somali': 'Somalia',
  
  'djibouti': 'Djibouti',
  'djiboutian': 'Djibouti',
  
  'eritrea': 'Eritrea',
  'eritrean': 'Eritrea',
  
  'comoros': 'Comoros',
  'comorian': 'Comoros',
  
  'seychelles': 'Seychelles',
  'seychellois': 'Seychelles',
  
  'mauritius': 'Mauritius',
  'mauritian': 'Mauritius',
  
  'reunion': 'Réunion',
  'reunionese': 'Réunion',
  
  'mayotte': 'Mayotte',
  'mahoran': 'Mayotte',
  
  'cape verde': 'Cape Verde',
  'cabo verde': 'Cape Verde',
  'cape verdean': 'Cape Verde',
  
  'gambia': 'Gambia',
  'gambian': 'Gambia',
  
  'guinea-bissau': 'Guinea-Bissau',
  'guinea bissau': 'Guinea-Bissau',
  'bissau-guinean': 'Guinea-Bissau',
  
  'equatorial guinea': 'Equatorial Guinea',
  'equatoguinean': 'Equatorial Guinea',
  
  'gabon': 'Gabon',
  'gabonese': 'Gabon',
  
  'congo-brazzaville': 'Congo-Brazzaville',
  'republic of the congo': 'Congo-Brazzaville',
  'congolese': 'Congo-Brazzaville',
  
  'congo-kinshasa': 'Congo-Kinshasa',
  'democratic republic of the congo': 'Congo-Kinshasa',
  'drc': 'Congo-Kinshasa',
  'zaire': 'Congo-Kinshasa',
  
  'sao tome and principe': 'Sao Tome and Principe',
  'sao tome': 'Sao Tome and Principe',
  'sao tomean': 'Sao Tome and Principe',
  
  'namibia': 'Namibia',
  'namibian': 'Namibia',
  
  'botswana': 'Botswana',
  'botswanan': 'Botswana',
  
  'lesotho': 'Lesotho',
  'basotho': 'Lesotho',
  
  'eswatini': 'Eswatini',
  'swaziland': 'Eswatini',
  'swazi': 'Eswatini',
  
  'south africa': 'South Africa',
  'south african': 'South Africa',
  
  'china': 'China',
  'chinese': 'China',
  
  'japan': 'Japan',
  'japanese': 'Japan',
  
  'korea': 'Korea',
  'korean': 'Korea',
  'south korea': 'Korea',
  'republic of korea': 'Korea',
  
  'north korea': 'North Korea',
  'dprk': 'North Korea',
  'democratic people\'s republic of korea': 'North Korea',
  
  'taiwan': 'Taiwan',
  'taiwanese': 'Taiwan',
  'republic of china': 'Taiwan',
  'roc': 'Taiwan',
  
  'philippines': 'Philippines',
  'filipino': 'Philippines',
  'filipina': 'Philippines',
  
  'malaysia': 'Malaysia',
  'malaysian': 'Malaysia',
  
  'singapore': 'Singapore',
  'singaporean': 'Singapore',
  
  'brunei': 'Brunei',
  'bruneian': 'Brunei',
  
  'east timor': 'East Timor',
  'timor-leste': 'East Timor',
  'timorese': 'East Timor',
  
  'cambodia': 'Cambodia',
  'cambodian': 'Cambodia',
  
  'laos': 'Laos',
  'laotian': 'Laos',
  'lao': 'Laos',
  
  'myanmar': 'Myanmar',
  'burma': 'Myanmar',
  'burmese': 'Myanmar',
  
  'bangladesh': 'Bangladesh',
  'bangladeshi': 'Bangladesh',
  
  'sri lanka': 'Sri Lanka',
  'sri lankan': 'Sri Lanka',
  'ceylon': 'Sri Lanka',
  
  'maldives': 'Maldives',
  'maldivian': 'Maldives',
  
  'nepal': 'Nepal',
  'nepalese': 'Nepal',
  'nepali': 'Nepal',
  
  'bhutan': 'Bhutan',
  'bhutanese': 'Bhutan',
  
  'pakistan': 'Pakistan',
  'pakistani': 'Pakistan',
  
  'afghanistan': 'Afghanistan',
  'afghan': 'Afghanistan',
  
  'iran': 'Iran',
  'iranian': 'Iran',
  'persian': 'Iran',
  
  'iraq': 'Iraq',
  'iraqi': 'Iraq',
  
  'syria': 'Syria',
  'syrian': 'Syria',
  
  'lebanon': 'Lebanon',
  'lebanese': 'Lebanon',
  
  'jordan': 'Jordan',
  'jordanian': 'Jordan',
  
  'israel': 'Israel',
  'israeli': 'Israel',
  
  'palestine': 'Palestine',
  'palestinian': 'Palestine',
  
  'saudi arabia': 'Saudi Arabia',
  'saudi': 'Saudi Arabia',
  'saudi arabian': 'Saudi Arabia',
  
  'kuwait': 'Kuwait',
  'kuwaiti': 'Kuwait',
  
  'bahrain': 'Bahrain',
  'bahraini': 'Bahrain',
  
  'qatar': 'Qatar',
  'qatari': 'Qatar',
  
  'uae': 'UAE',
  'united arab emirates': 'UAE',
  'emirati': 'UAE',
  
  'oman': 'Oman',
  'omani': 'Oman',
  
  'türkiye': 'Türkiye', 
  'turkish': 'Türkiye',
  
  'cyprus': 'Cyprus',
  'cypriot': 'Cyprus',
  
  'greece': 'Greece',
  'greek': 'Greece',
  
  'albania': 'Albania',
  'albanian': 'Albania',
  
  'macedonia': 'Macedonia',
  'macedonian': 'Macedonia',
  'north macedonia': 'Macedonia',
  
  'kosovo': 'Kosovo',
  'kosovar': 'Kosovo',
  
  'serbia': 'Serbia',
  'serbian': 'Serbia',
  
  'montenegro': 'Montenegro',
  'montenegrin': 'Montenegro',
  
  'bosnia and herzegovina': 'Bosnia and Herzegovina',
  'bosnian': 'Bosnia and Herzegovina',
  'herzegovinian': 'Bosnia and Herzegovina',
  
  'croatia': 'Croatia',
  'croatian': 'Croatia',
  
  'slovenia': 'Slovenia',
  'slovenian': 'Slovenia',
  
  'hungary': 'Hungary',
  'hungarian': 'Hungary',
  
  'slovakia': 'Slovakia',
  'slovak': 'Slovakia',
  'slovakian': 'Slovakia',
  
  'czech republic': 'Czech Republic',
  'czech': 'Czech Republic',
  'czechia': 'Czech Republic',
  
  'poland': 'Poland',
  'polish': 'Poland',
  
  'lithuania': 'Lithuania',
  'lithuanian': 'Lithuania',
  
  'latvia': 'Latvia',
  'latvian': 'Latvia',
  
  'estonia': 'Estonia',
  'estonian': 'Estonia',
  
  'finland': 'Finland',
  'finnish': 'Finland',
  
  'sweden': 'Sweden',
  'swedish': 'Sweden',
  
  'norway': 'Norway',
  'norwegian': 'Norway',
  
  'denmark': 'Denmark',
  'danish': 'Denmark',
  
  'iceland': 'Iceland',
  'icelandic': 'Iceland',
  
  'ireland': 'Ireland',
  'irish': 'Ireland',
  
  'netherlands': 'Netherlands',
  'dutch': 'Netherlands',
  'holland': 'Netherlands',
  
  'belgium': 'Belgium',
  'belgian': 'Belgium',
  
  'luxembourg': 'Luxembourg',
  'luxembourgish': 'Luxembourg',
  
  'france': 'France',
  'french': 'France',
  
  'spain': 'Spain',
  'spanish': 'Spain',
  
  'portugal': 'Portugal',
  'portuguese': 'Portugal',
  
  'italy': 'Italy',
  'italian': 'Italy',
  
  'switzerland': 'Switzerland',
  'swiss': 'Switzerland',
  
  'austria': 'Austria',
  'austrian': 'Austria',
  
  'germany': 'Germany',
  'german': 'Germany',
  
  'liechtenstein': 'Liechtenstein',
  'liechtensteiner': 'Liechtenstein',
  
  'monaco': 'Monaco',
  'monacan': 'Monaco',
  
  'andorra': 'Andorra',
  'andorran': 'Andorra',
  
  'san marino': 'San Marino',
  'sammarinese': 'San Marino',
  
  'vatican city': 'Vatican City',
  'holy see': 'Vatican City',
  'vatican': 'Vatican City',
  
  'malta': 'Malta',
  'maltese': 'Malta',
  
  'romania': 'Romania',
  'romanian': 'Romania',
  
  'bulgaria': 'Bulgaria',
  'bulgarian': 'Bulgaria',
  
  'moldova': 'Moldova',
  'moldovan': 'Moldova',
  
  'ukraine': 'Ukraine',
  'ukrainian': 'Ukraine',
  
  'belarus': 'Belarus',
  'belarusian': 'Belarus',
  
  'russia': 'Russia',
  'russian': 'Russia',
  
  'georgia': 'Georgia',
  'georgian': 'Georgia',
  
  'armenia': 'Armenia',
  'armenian': 'Armenia',
  
  'azerbaijan': 'Azerbaijan',
  'azerbaijani': 'Azerbaijan',
  
  'kazakhstan': 'Kazakhstan',
  'kazakh': 'Kazakhstan',
  
  'uzbekistan': 'Uzbekistan',
  'uzbek': 'Uzbekistan',
  
  'turkmenistan': 'Turkmenistan',
  'turkmen': 'Turkmenistan',
  
  'kyrgyzstan': 'Kyrgyzstan',
  'kyrgyz': 'Kyrgyzstan',
  
  'tajikistan': 'Tajikistan',
  'tajik': 'Tajikistan',
  
  'mongolia': 'Mongolia',
  'mongolian': 'Mongolia',
}

/**
 * Standardizes a roaster name by normalizing common variations
 */
export function standardizeRoasterName(name: string): string {
  if (!name) return name
  
  const normalized = name.toLowerCase().trim()
  return ROASTER_STANDARDIZATION[normalized] || name
}

/**
 * Standardizes an origin name by normalizing common variations
 */
export function standardizeOriginName(name: string): string {
  if (!name) return name
  
  const normalized = name.toLowerCase().trim()
  return ORIGIN_STANDARDIZATION[normalized] || name
}

/**
 * Standardizes all roaster names in a dataset
 */
export function standardizeRoasterNames(data: any[]): any[] {
  return data.map(item => ({
    ...item,
    roaster: standardizeRoasterName(item.roaster)
  }))
}

/**
 * Standardizes all origin names in a dataset
 */
export function standardizeOriginNames(data: any[]): any[] {
  return data.map(item => ({
    ...item,
    origin: standardizeOriginName(item.origin)
  }))
}

/**
 * Standardizes both roaster and origin names in a dataset
 */
export function standardizeNames(data: any[]): any[] {
  return data.map(item => ({
    ...item,
    roaster: standardizeRoasterName(item.roaster),
    origin: standardizeOriginName(item.origin)
  }))
} 