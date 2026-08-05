const { createClient } = require('@supabase/supabase-js');

// Masukkan URL & Anon Key dari Supabase kamu
const supabaseUrl = 'https://pckydqsnlymwviyfawrj.supabase.co';
const supabaseKey = 'sb_publishable_4VIwlJ0IWML2t-a5AZ3DYw_4S2-G84T';
const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadData() {
  const hotlinesData = [
    { name: "Police", number: "110" },
    { name: "Ambulance", number: "119" },
    { name: "Your Guard", number: "08123456789" }
  ];

  const contactsData = [
    { name: "Bunda", phone: "081111112222", image: "https://i.pinimg.com/originals/e8/1a/b9/e81ab96e0a04e880f00eb9c6d160273d.jpg?nii=t" },
    { name: "Ayah", phone: "081233334444", image: "https://i.pinimg.com/originals/a9/d6/ad/a9d6ad271958fb7b5187e702cd31a54f.jpg" },
    { name: "Kakak", phone: "081355556666", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkmVb8Mpn9mASveeqnpg9jgOB8buueIf-OtNtNCKnuDUF_3JaRYZxTPtS6&s=10" }
  ];

  const { error: err1 } = await supabase.from('hotlines').insert(hotlinesData);
  if (err1) console.error("Gagal insert hotlines:", err1.message);
  else console.log("Berhasil insert hotlines!");

  const { error: err2 } = await supabase.from('trusted_contacts').insert(contactsData);
  if (err2) console.error("Gagal insert contacts:", err2.message);
  else console.log("Berhasil insert trusted_contacts!");
}

uploadData();

// const ContactData = [
//     {
//     "hotlines": [
//         {
//         "id": 1,
//         "name": "Police",
//         "number": "110"
//         },
//         {
//         "id": 2,
//         "name": "Ambulance",
//         "number": "119"
//         },
//         {
//         "id": 3,
//         "name": "Your Guard",
//         "number": "08123456789"
//         }
//     ],
//     "trusted_contacts": [
//         {
//         "id": 1,
//         "name": "Bunda",
//         "phone": "081111112222",
//         "relationship": "Parent"
//         },
//         {
//         "id": 2,
//         "name": "Ayah",
//         "phone": "081233334444",
//         "relationship": "Parent"
//         },
//         {
//         "id": 3,
//         "name": "Kakak",
//         "phone": "081355556666",
//         "relationship": "Sibling"
//         }
//     ]
//     }
// ]

// const reportsData = [
//   {
//     "id": 1,
//     "title": "Catcalling and Verbal Harassment Group",
//     "time": "10 mins ago • 0.5 km",
//     "description": "A group of men frequently loiters near the convenience store corner, making inappropriate comments and catcalling passing women.",
//     "location": "Convenience Store Alley",
//     "address": "Jl. Senopati, South Jakarta",
//     "status": "Dangerous",
//     "images": [
//       "https://upload.wikimedia.org/wikipedia/commons/f/f6/Alfamart_KTM_Jonggol%2C_Cileungsi_-_panoramio.jpg",
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/FamilyMart_Yoshinoya_Jl_Bulungan_Jakarta_Selatan.JPG/250px-FamilyMart_Yoshinoya_Jl_Bulungan_Jakarta_Selatan.JPG"
//     ]
//   },
//   {
//     "id": 2,
//     "title": "Extremely Dark Alleyway at Night",
//     "time": "25 mins ago • 1.2 km",
//     "description": "All streetlights are broken along this shortcut path frequently used by female employees walking home from the station.",
//     "location": "Pedestrian Shortuct Path",
//     "address": "Setiabudi, South Jakarta",
//     "status": "Dangerous",
//     "images": [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrKsewvNfMQNiVop5ncAiMkGul4-x4XmEKeMB9HF--TsUprnF71jxjgRfy&s=10",
//       "https://www.permatrak.com/hubfs/South-lake-tahoe-pedestrian-bridge-design.jpg"
//     ]
//   },
//   {
//     "id": 3,
//     "title": "Suspicious Stalker Loitering Near Dorm",
//     "time": "45 mins ago • 1.8 km",
//     "description": "An unidentified man has been spotted lingering near the women's boarding house entrance for hours without clear business.",
//     "location": "Women's Boarding House Area",
//     "address": "Jl. Pegangsaan Timur, Central Jakarta",
//     "status": "Dangerous",
//     "images": [
//       "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60",
//       "https://i.pinimg.com/736x/f6/24/e4/f624e4759b4d7f074a98f535ddd5b3c8.jpg"
//     ]
//   },
//   {
//     "id": 4,
//     "title": "Overcrowded Train Car / Groping Risk",
//     "time": "1 hour ago • 2.4 km",
//     "description": "Extreme overcrowding during rush hour makes it difficult to maintain personal space, higher risk of unwanted physical contact.",
//     "location": "Manggarai Station Platform",
//     "address": "Manggarai, South Jakarta",
//     "status": "Caution",
//     "images": [
//       "https://upload.wikimedia.org/wikipedia/commons/7/73/East_Entrance_of_Manggarai_Railway_Station_%282024-12-21%29.jpg?utm_source=id.wikipedia.org&utm_campaign=index&utm_content=original",
//       "https://asset.kompas.com/crops/GrGxP_my0bjxHh2uqI9B1wcbUX8=/0x0:1000x667/1200x800/data/photo/2017/10/12/20024881507014215ed1-kereta-rel-listrik-krl-relasi-bogor-angke-anjlok-di-stasiun-mang.jpg"
//     ]
//   },
//   {
//     "id": 5,
//     "title": "Isolated Footbridge with Broken CCTV",
//     "time": "2 hours ago • 3.0 km",
//     "description": "The overhead pedestrian bridge is completely deserted after 8 PM, and the security cameras appear non-functional.",
//     "location": "Sudirman Overhead Bridge",
//     "address": "Jl. Jend. Sudirman, Central Jakarta",
//     "status": "Caution",
//     "images": [
//       "https://img.jakpost.net/c/2022/01/07/2022_01_07_121205_1641551300._large.jpg",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSneu4k8l4WCW9GKMoaNGavzuqehQ-cK-c2zgLGtfkcA-jLg5ujrm4suwU&s=10"
//     ]
//   },
//   {
//     "id": 6,
//     "title": "Unmonitored Park Area After Dark",
//     "time": "3 hours ago • 3.5 km",
//     "description": "Lack of security patrols around the park perimeter at night makes female joggers feel unsafe.",
//     "location": "Menteng Public Park",
//     "address": "Menteng, Central Jakarta",
//     "status": "Caution",
//     "images": [
//       "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60",
//       "https://www.indonesia-tourism.com/jakarta/images/menteng_park.jpg"
//     ]
//   },
//   {
//     "id": 7,
//     "title": "Group of Intoxicated Men Blocking Sidewalk",
//     "time": "4 hours ago • 4.1 km",
//     "description": "Several men drinking alcohol right on the narrow walkway, shouting comments at women walking past.",
//     "location": "Kemang Commercial Row",
//     "address": "Kemang, South Jakarta",
//     "status": "Dangerous",
//     "images": [
//       "https://img.properti1.com/2026/01/2026-01-22_njePPI87Q8nRRjd_tn.jpg",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-by4xijWgwfOadu0-j06hRHLOInXAiAaxExaMtq0Emg&s=10"
//     ]
//   },
//   {
//     "id": 8,
//     "title": "Poorly Lit Parking Garage Stairwell",
//     "time": "5 hours ago • 4.8 km",
//     "description": "Basement parking lot stairwell is dim and isolated, posing a security risk for women returning late to their vehicles.",
//     "location": "Plaza Basement Level B2",
//     "address": "Kuningan, South Jakarta",
//     "status": "Caution",
//     "images": [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdtBpAbE_0ANVVRMGEdz8S5UETZ7McLyyBVuED4vMsciRXyrNtbIIYODE&s=10",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIMK2GHRfeqTkosAqGj4mhyNgQNcAMer4NviQFxLWfQ9NFzpl3gRAg_jg&s=10"
//     ]
//   },
//   {
//     "id": 9,
//     "title": "Broken Sidewalk Forcing Walkers to Roadway",
//     "time": "6 hours ago • 1.0 km",
//     "description": "Blocked sidewalk forces women to walk directly onto busy vehicle lanes, risking physical safety.",
//     "location": "Cikini Raya Street",
//     "address": "Cikini, Central Jakarta",
//     "status": "Caution",
//     "images": [
//       "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60",
//       "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60"
//     ]
//   },
//   {
//     "id": 10,
//     "title": "Well-lit and Secure Patrol Area",
//     "time": "7 hours ago • 2.0 km",
//     "description": "Active community security guards and bright lighting present. Verified safe zone for late-night walks.",
//     "location": "SCBD Main Lobby Area",
//     "address": "Senayan, South Jakarta",
//     "status": "Safe",
//     "images": [
//       "https://www.tempat-usaha.com/iklan/images/2025/08/4511_4.jpg",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRAGm4WvbP7nIM5pEvRpKCXmlerLQfh2R0a78x9nxQErTuEDXb1gU9hvG4&s=10"
//     ]
//   },
//   {
//     "id": 11,
//     "title": "Safe Busway Shelter with Active Security",
//     "time": "8 hours ago • 3.2 km",
//     "description": "Station has permanent security personnel on duty and full CCTV coverage, making female commuters feel secure.",
//     "location": "Harmoni TransJakarta Station",
//     "address": "Gambir, Central Jakarta",
//     "status": "Safe",
//     "images": [
//       "https://media.suara.com/pictures/653x366/2023/03/09/78513-halte-harmoni-halte-harmoni-sementara.jpg",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRknMJOMI7cRKYDw0vMittNC-ER9dWhx1QH2p2hDy9w3fu-1hpkLlFMDDU&s=10"
//     ]
//   },
//   {
//     "id": 12,
//     "title": "Unattended Dark Corner Behind Building",
//     "time": "9 hours ago • 5.0 km",
//     "description": "Hidden dead-end path behind commercial units with zero lighting. Advised to avoid completely after sunset.",
//     "location": "Old Town Commercial Backstreet",
//     "address": "Kota Tua, West Jakarta",
//     "status": "Dangerous",
//     "images": [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEgVD8j5eeckdHut1YoDL8TGAI6t77_QjQ7fM8vMwukCvrxfARbfeaOprh&s=10",
//       "https://ik.imagekit.io/tvlk/blog/2020/03/Kali-Besar-Kota-Tua-Editorial-Use-Onlu-shutterstock_1513481645.jpg"
//     ]
//   },
//   {
//     "id": 13,
//     "title": "Harassment Report near Abandoned Structure",
//     "time": "10 hours ago • 5.5 km",
//     "description": "A woman reported being followed briefly near the abandoned building perimeter before escaping to a crowded shop.",
//     "location": "Abandoned Complex Perimeter",
//     "address": "Gajah Mada, Central Jakarta",
//     "status": "Dangerous",
//     "images": [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4gHFenhzzMq0o2wB-cC7wd6iUiYhhNCNMY4eMLOc1j8EqEGVzxmhg-wY&s=10",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5VP2skTDK3bdcj19-DtT-lEWU1ceItsHy7Ps8OWx8Vw&s=10"
//     ]
//   },
//   {
//     "id": 14,
//     "title": "Good Lighting and Guard Presence",
//     "time": "12 hours ago • 1.5 km",
//     "description": "Apartment zone equipped with 24/7 security patrol and CCTV monitoring along walking paths.",
//     "location": "Menteng Residence Zone",
//     "address": "Menteng, Central Jakarta",
//     "status": "Safe",
//     "images": [
//       "https://www.smproperty123.com/wp-content/uploads/2017/12/IMG-20171106-WA0015-870x420.jpg",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNYqp7Qdr7HdJrD0sY6lUfXNrhWocunInsvSu7RERC7LLmblv4PMBkW2q_&s=10"
//     ]
//   },
//   {
//     "id": 15,
//     "title": "Isolating Construction Wall / Blind Spot",
//     "time": "14 hours ago • 3.8 km",
//     "description": "Temporary high wooden construction hoardings create a narrow, unmonitored blind spot for pedestrians.",
//     "location": "Slipi Construction Site",
//     "address": "Palmerah, West Jakarta",
//     "status": "Caution",
//     "images": [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05_QJsi2vRrI3-fAV0c-oh5VXq1vWi4i0uX4ZGRrsk2JCpfDEPWOY4bq_&s=10",
//       "https://awsimages.detik.net.id/community/media/visual/2025/09/10/perbaikan-trotoar-simpang-slipi-terus-dikebut-1757498368712_169.jpeg?w=1200"
//     ]
//   },
//   {
//     "id": 16,
//     "title": "Safe Commercial Square with Security Patrols",
//     "time": "16 hours ago • 4.5 km",
//     "description": "Open public square with active night patrolling, well-lit cafes, and high foot traffic.",
//     "location": "Senayan Park Plaza",
//     "address": "Gelora, Central Jakarta",
//     "status": "Safe",
//     "images": [
//       "https://www.shutterstock.com/image-photo/senayan-park-jakarta-indonesia-on-260nw-2701865279.jpg",
//       "https://awsimages.detik.net.id/community/media/visual/2020/09/07/spark-mall-2_169.jpeg?w=600&q=90"
//     ]
//   },
//   {
//     "id": 17,
//     "title": "Dark Public Transport Waiting Area",
//     "time": "18 hours ago • 2.9 km",
//     "description": "Microlet/Angkot waiting spot lacks proper lighting at night, causing anxiety for female passengers waiting alone.",
//     "location": "Jatinegara Terminal Outskirts",
//     "address": "Jatinegara, East Jakarta",
//     "status": "Caution",
//     "images": [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHyEQjWg6KmyLcWfoTyIXG2P38HyNpMW87oJOPA6CqgQ&s=10",
//       "https://cdn.antaranews.com/cache/1200x800/2023/01/04/antarafoto-pengoperasian-halte-integrasi-dengan-stasiun-jatinegara-04012023-mrh-5.jpg"
//     ]
//   },
//   {
//     "id": 18,
//     "title": "Verified Safe Campus Walkway",
//     "time": "20 hours ago • 6.0 km",
//     "description": "University zone featuring emergency intercom poles, bright lighting, and regular student security patrols.",
//     "location": "Salemba Campus Corridor",
//     "address": "Salemba, Central Jakarta",
//     "status": "Safe",
//     "images": [
//       "https://pascakomunikasi.fisip.ui.ac.id/wp-content/uploads/2023/09/jkt1.jpg",
//       "https://www.beritadaerah.co.id/wp-content/uploads/2024/01/b16a70a7-cc5c-4596-81b8-57535744a84a-750x400.jpeg"
//     ]
//   },
//   {
//     "id": 19,
//     "title": "Suspicious Motorcyclist Following Pedestrians",
//     "time": "1 day ago • 4.0 km",
//     "description": "Reports of a slow-riding motorcyclist tailing women walking alone down residential side streets.",
//     "location": "Residential Sector 3",
//     "address": "Kelapa Gading, North Jakarta",
//     "status": "Dangerous",
//     "images": [
//       "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=60",
//       "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&auto=format&fit=crop&q=60"
//     ]
//   },
//   {
//     "id": 20,
//     "title": "Well-Maintained Safe Pedestrian Zone",
//     "time": "1 day ago • 1.6 km",
//     "description": "Wide, clean sidewalks with continuous CCTV coverage and community watch presence. Highly recommended route.",
//     "location": "Blok M Safe Corridor",
//     "address": "Kebayoran Baru, South Jakarta",
//     "status": "Safe",
//     "images": [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRqjV03lP1t7zGb371nnljmjl9EGlxK4Zm6I3lbfbRTEWzKdc1giOEPUnU&s=10",
//       "https://akcdn.detik.net.id/visual/2025/05/28/menyusuri-blok-m-hub-wajah-baru-terminal-blok-m-1748429886012_169.jpeg?w=650&q=80"
//     ]
//   }
// ];
