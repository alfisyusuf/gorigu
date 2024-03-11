
$(document).ready(function(){
    // Function to update employee options based on selected unit
    function updateEmployeeOptions(unit) {
    var employeeSelect = $('#employeeSelect');
    // Clear previous options
    employeeSelect.empty();
    // Add new options based on selected unit
    switch(unit) {
        case 'TKII Surakarta':
        employeeSelect.append('<option>Nisa Hidayati</option>');
        employeeSelect.append('<option>Malinda Hidayanti</option>');
        employeeSelect.append('<option>Alfinna Setya Rahayu</option>');
        employeeSelect.append('<option>Laily Istifaiyah</option>');
        employeeSelect.append('<option>Laela Nur &apos;Aini</option>');
        employeeSelect.append('<option>Anisa Rosilawati QA</option>');
        employeeSelect.append('<option>Fauziyah Soimah</option>');
        employeeSelect.append('<option>Khoiri Hidayati</option>');
        employeeSelect.append('<option>Yunita Miftahunisa</option>');
        employeeSelect.append('<option>Natasya Cindy CS</option>');
        employeeSelect.append('<option>Marito</option>');
        employeeSelect.append('<option>Yuni Irawati</option>');
        employeeSelect.append('<option>Siti Nur Khasanah</option>');
        employeeSelect.append('<option>Siti Rochimah</option>');
        employeeSelect.append('<option>Vylla Nurika Sari</option>');
        employeeSelect.append('<option>Mugi Rahayu</option>');
        employeeSelect.append('<option>Ita Rusdiana</option>');
        employeeSelect.append('<option>Dwi Erika M</option>');
        employeeSelect.append('<option>Dian Rifiah</option>');
        employeeSelect.append('<option>Uswatun Hasanah</option>');
        employeeSelect.append('<option>Qonitatul Mahmudah</option>');
        employeeSelect.append('<option>Imawati Rodhiyyana</option>');
        employeeSelect.append('<option>Nina Nuroniah</option>');
        employeeSelect.append('<option>Dessy Nuraini A</option>');
        employeeSelect.append('<option>Desi Nurjayanti</option>');
        employeeSelect.append('<option>Reni Apriyani</option>');
        break;
        case 'TKQP Surakarta':
        employeeSelect.append('<option>Nur Endah S</option>');
        employeeSelect.append('<option>Dewi Ambarsari</option>');
        employeeSelect.append('<option>Latifa</option>');
        employeeSelect.append('<option>Riski Faujiyah</option>');
        employeeSelect.append('<option>Stefi</option>');
        employeeSelect.append('<option>Lina</option>');
        employeeSelect.append('<option>Dhista</option>');
        employeeSelect.append('<option>Tuwiyem</option>');
        employeeSelect.append('<option>Ratih Listeriyadi</option>');
        employeeSelect.append('<option>Ina Indrawati</option>');
        employeeSelect.append('<option>Farida Nuraini</option>');
        employeeSelect.append('<option>Putri Cahya Sari</option>');
        break;
        case 'SDII Surakarta':
        employeeSelect.append('<option>Sri Wachyuningsih</option>');
        employeeSelect.append('<option>Mr Thor</option>');
        employeeSelect.append('<option>Ust Huri</option>');
        employeeSelect.append('<option>Ust Arwan</option>');
        employeeSelect.append('<option>Ust Ramelan</option>');
        employeeSelect.append('<option>Mr Totok</option>');
        employeeSelect.append('<option>Mr Arif</option>');
        employeeSelect.append('<option>Mr Zein</option>');
        employeeSelect.append('<option>Pak Said</option>');
        employeeSelect.append('<option>Pak Amin</option>');
        employeeSelect.append('<option>Pak Ery</option>');
        employeeSelect.append('<option>Pak Tofa</option>');
        employeeSelect.append('<option>Mr Alan</option>');
        employeeSelect.append('<option>Mr Argo</option>');
        employeeSelect.append('<option>Mr Fawwas</option>');
        employeeSelect.append('<option>Mr Lukam</option>');
        employeeSelect.append('<option>Ust Arno</option>');
        employeeSelect.append('<option>Mrs Lutfi</option>');
        employeeSelect.append('<option>Ms Firda</option>');
        employeeSelect.append('<option>Ms Zahra</option>');
        employeeSelect.append('<option>Ms Romi</option>');
        employeeSelect.append('<option>Us Imah</option>');
        employeeSelect.append('<option>Us Maisy</option>');
        employeeSelect.append('<option>Ms Yolan</option>');
        employeeSelect.append('<option>Ms Azizah</option>');
        employeeSelect.append('<option>Ms Fadhilah</option>');
        employeeSelect.append('<option>Ms Dhila</option>');
        employeeSelect.append('<option>Mbak Lisna</option>');
        employeeSelect.append('<option>Ms Yossi</option>');
        employeeSelect.append('<option>Ms Dika</option>');
        employeeSelect.append('<option>Ms Titis</option>');
        employeeSelect.append('<option>Ms Widya</option>');
        employeeSelect.append('<option>Us Ifa</option>');
        employeeSelect.append('<option>Ms Firda</option>');
        employeeSelect.append('<option>Us Nisa</option>');
        employeeSelect.append('<option>Ms Zeni</option>');
        employeeSelect.append('<option>Ms Nia</option>');
        employeeSelect.append('<option>Ms Efa</option>');
        employeeSelect.append('<option>Ms Yuni</option>');
        employeeSelect.append('<option>Ms Anggi</option>');
        employeeSelect.append('<option>Mb Nuroh</option>');
        employeeSelect.append('<option>Ms Sari</option>');
        employeeSelect.append('<option>Ms Mega</option>');
        employeeSelect.append('<option>Ms Lina</option>');
        employeeSelect.append('<option>Ms Intan</option>');
        employeeSelect.append('<option>Us Uswah</option>');
        employeeSelect.append('<option>Ms Listy</option>');
        employeeSelect.append('<option>Ms Lia</option>');
        employeeSelect.append('<option>Ms Uus</option>');
        employeeSelect.append('<option>Ms Imah</option>');
        employeeSelect.append('<option>Us Pinky</option>');
        employeeSelect.append('<option>Ms Yanti</option>');
        employeeSelect.append('<option>Us Dessya</option>');
        employeeSelect.append('<option>Ms Ninik </option>');
        employeeSelect.append('<option>Ms Hasna</option>');
        employeeSelect.append('<option>Ms Lutfi</option>');
        break;
        case 'SDTQ Surakarta':
        employeeSelect.append('<option>Abbad Sa&apos;id Muhammad, S.Pd</option>');
        employeeSelect.append('<option>Abu Dawud</option>');
        employeeSelect.append('<option>Agung Wahyu Utomo</option>');
        employeeSelect.append('<option>Ahmad Fahmi Alfian</option>');
        employeeSelect.append('<option>Anis Setyowati, S.Pd</option>');
        employeeSelect.append('<option>Annur Indah sari, S.Pd.I</option>');
        employeeSelect.append('<option>Ari Rahmawati</option>');
        employeeSelect.append('<option>Arif Budiyono, S.PdI</option>');
        employeeSelect.append('<option>Arista Kunti Habsari, S. Pd</option>');
        employeeSelect.append('<option>Ayu Sholichah, S.S</option>');
        employeeSelect.append('<option>Azizah Al- Ayubi</option>');
        employeeSelect.append('<option>Deka Selfiana</option>');
        employeeSelect.append('<option>Devie Ayu Arinikha, S.Pd.I</option>');
        employeeSelect.append('<option>Dewi Mifta Maya Andira,S.Pd</option>');
        employeeSelect.append('<option>Dina Arifatul Husna</option>');
        employeeSelect.append('<option>Dizki Aji Pangestu, S.Pd</option>');
        employeeSelect.append('<option>Dyah Astari, S.T.</option>');
        employeeSelect.append('<option>Elya Retna Purwaningtyas, ST</option>');
        employeeSelect.append('<option>Ernawati, S.Sos, S.Pd</option>');
        employeeSelect.append('<option>Fathullah, SE.Sy.</option>');
        employeeSelect.append('<option>Fatnia Ulul Arfiyanti, S.Pd</option>');
        employeeSelect.append('<option>Hastin Nailul Mawadah, S. Kep</option>');
        employeeSelect.append('<option>Indah Kurniawati, S.S., S.Pd</option>');
        employeeSelect.append('<option>Indriyani, S.Pd</option>');
        employeeSelect.append('<option>Khoirun Nisa&apos;, S.Pd.I </option>');
        employeeSelect.append('<option>Kuswardani Dyah Ayu Kusumaningrum, S.Ag</option>');
        employeeSelect.append('<option>Luth Hafizh Bahtiar,S.Pd</option>');
        employeeSelect.append('<option>Lutviyana Galih Paswatiningsih,S.H, S.Pd</option>');
        employeeSelect.append('<option>Maia Amelya Zapin</option>');
        employeeSelect.append('<option>Masrukan, S.Pd.I</option>');
        employeeSelect.append('<option>Melani Ismoyowati, S.Pd</option>');
        employeeSelect.append('<option>Muhammad Amin,A.Ma.Pd</option>');
        employeeSelect.append('<option>Muhammad Faisal Alaq Qodrian Efendi</option>');
        employeeSelect.append('<option>Muhammad Mushab</option>');
        employeeSelect.append('<option>Munawaroh, S.Pd.I</option>');
        employeeSelect.append('<option>Nafi Umi Atmaja</option>');
        employeeSelect.append('<option>Nanik Sulistyo Rahayu</option>');
        employeeSelect.append('<option>Nur Anisa</option>');
        employeeSelect.append('<option>Nuraini, S.Pd.</option>');
        employeeSelect.append('<option>Nur Islami Prayoganing Ayu</option>');
        employeeSelect.append('<option>Nurul Humaeroh Kartiko Winar</option>');
        employeeSelect.append('<option>Paramadina Santri</option>');
        employeeSelect.append('<option>Rin Fibriana, S.Psi, S.Pd.I</option>');
        employeeSelect.append('<option>Rizal Mustofa</option>');
        employeeSelect.append('<option>Rohmat Roi Waldi</option>');
        employeeSelect.append('<option>Siti Chotijah, S.Pd</option>');
        employeeSelect.append('<option>Siti Nurhayati, S.Pi, S.Pd</option>');
        employeeSelect.append('<option>Siti Rofiyatun</option>');
        employeeSelect.append('<option>Sri Utami, S.Pd.I</option>');
        employeeSelect.append('<option>Sumiyati, S.Hum</option>');
        employeeSelect.append('<option>Ummu Izzatul  Uswatun Khasanah</option>');
        employeeSelect.append('<option>Wahyu Catur Rini</option>');
        employeeSelect.append('<option>Warti, S.Si</option>');
        employeeSelect.append('<option>Zhahrul Makhfud, S,Pd</option>');
        break;
        case 'SDICT Surakarta':
        employeeSelect.append('<option>Tri Wijayanti</option>');
        employeeSelect.append('<option>Moh Jauhari Ahmad</option>');
        employeeSelect.append('<option>Muchsin</option>');
        employeeSelect.append('<option>Hendri</option>');
        employeeSelect.append('<option>Dimas Tegar</option>');
        employeeSelect.append('<option>Mr Al</option>');
        employeeSelect.append('<option>Choirul Anwar</option>');
        employeeSelect.append('<option>Rahmawati Eki</option>');
        employeeSelect.append('<option>Nanik Yulianti</option>');
        employeeSelect.append('<option>Fadiah Azmi</option>');
        employeeSelect.append('<option>Fadlillah Ramadani</option>');
        employeeSelect.append('<option>Hafida Aminindia</option>');
        employeeSelect.append('<option>Qhoirul Annisa</option>');
        employeeSelect.append('<option>Taufik Ma&apos;ruf</option>');
        employeeSelect.append('<option>Heldayani</option>');
        employeeSelect.append('<option>Rosita Pamulia Andani</option>');
        employeeSelect.append('<option>Khilyatin Ulin</option>');
        employeeSelect.append('<option>Elva Herlin Yeliana</option>');
        employeeSelect.append('<option>Rizky Mukaromah</option>');
        employeeSelect.append('<option>Alfi Mubayyinah</option>');
        employeeSelect.append('<option>Kanti Wismanjari</option>');
        employeeSelect.append('<option>Endah Aprilia Purwaningrum</option>');
        employeeSelect.append('<option>Ayu Oktavia Rosanti</option>');
        employeeSelect.append('<option>Erinda Sari</option>');
        employeeSelect.append('<option>Amalia Khusnu</option>');
        employeeSelect.append('<option>Dhian Fitriana</option>');
        employeeSelect.append('<option>Dwi Kresna Yulianti</option>');
        employeeSelect.append('<option>Apriyani Indri Trisnawati</option>');
        employeeSelect.append('<option>Regita Asharani</option>');
        employeeSelect.append('<option>Ana Sholekah Azhar</option>');
        employeeSelect.append('<option>Putri Salwa Salsabila</option>');
        employeeSelect.append('<option>Deri Rahmania Luhri</option>');
        employeeSelect.append('<option>Diana Putri Hidayati</option>');
        break;
        case 'SDII Sragen':
        employeeSelect.append('<option>Nur Asiyah</option>');
        employeeSelect.append('<option>Eka Nidya Ayu</option>');
        employeeSelect.append('<option>Riana Eka Nuria</option>');
        employeeSelect.append('<option>Maimunah</option>');
        employeeSelect.append('<option>Umi Nur Khasanah</option>');
        employeeSelect.append('<option>Ellya Saljadziba</option>');
        employeeSelect.append('<option>Matsna Sabila M</option>');
        employeeSelect.append('<option>Itsla Kamila Nasikh</option>');
        employeeSelect.append('<option>Novita Sari</option>');
        employeeSelect.append('<option>Wahyu Adhi Nugroho</option>');
        employeeSelect.append('<option>Sunarto</option>');
        employeeSelect.append('<option>Anton Munadi</option>');
        employeeSelect.append('<option>Nonik Nataliya</option>');
        employeeSelect.append('<option>Rahma Putri Utami</option>');
        employeeSelect.append('<option>Murniyati</option>');
        break;
        case 'SMPII Surakarta & SMP ABBS':
        employeeSelect.append('<option>Mia Febriana</option>');
        employeeSelect.append('<option>Eka Noer Mayasari</option>');
        employeeSelect.append('<option>Mr Ahmad Suleman</option>');
        employeeSelect.append('<option>Siti Asiyah</option>');
        employeeSelect.append('<option>Nor Azizah</option>');
        employeeSelect.append('<option>Adilah Rahmah</option>');
        employeeSelect.append('<option>Joan Nofila</option>');
        employeeSelect.append('<option>Nisa Ul Haq</option>');
        employeeSelect.append('<option>Iin Indah Saputri</option>');
        employeeSelect.append('<option>Siti Zamrotun R</option>');
        employeeSelect.append('<option>Titik Maryatun</option>');
        employeeSelect.append('<option>Sri Wahyuni</option>');
        employeeSelect.append('<option>Azizah Nur Aini</option>');
        employeeSelect.append('<option>Mr Khoir</option>');
        employeeSelect.append('<option>Mr Kurniawan</option>');
        employeeSelect.append('<option>Mr Dimas</option>');
        employeeSelect.append('<option>Ust Fahmi</option>');
        employeeSelect.append('<option>Mr Jack</option>');
        employeeSelect.append('<option>Mr Sharih</option>');
        employeeSelect.append('<option>Ust Yoki</option>');
        employeeSelect.append('<option>Mas Yudi</option>');
        employeeSelect.append('<option>Siti Khoimah</option>');
        employeeSelect.append('<option>Nurul Hidayati Kobir</option>');
        employeeSelect.append('<option>Heni Susilowati</option>');
        employeeSelect.append('<option>Alla&apos; Junian </option>');
        employeeSelect.append('<option>Dwi Wijayanti</option>');
        employeeSelect.append('<option>Ulfa Nurul K</option>');
        employeeSelect.append('<option>Nurul Hidayati</option>');
        employeeSelect.append('<option>Trully Damayanti</option>');
        employeeSelect.append('<option>Luthfa Usaidah</option>');
        employeeSelect.append('<option>Hannah Ummu A</option>');
        employeeSelect.append('<option>Alfia Setya R</option>');
        employeeSelect.append('<option>Laili Khairun</option>');
        employeeSelect.append('<option>Farras Asti</option>');
        employeeSelect.append('<option>Yustien Pramitha</option>');
        employeeSelect.append('<option>Hari Rohmah</option>');
        employeeSelect.append('<option>Lia Nuryani</option>');
        employeeSelect.append('<option>Dewi Nuraini</option>');
        employeeSelect.append('<option>Wela Ardha</option>');
        employeeSelect.append('<option>Ms Rina</option>');
        employeeSelect.append('<option>Ms Fitri</option>');
        employeeSelect.append('<option>Ms Eka</option>');
        employeeSelect.append('<option>Ms Sinta</option>');
        break;
        case 'Alabidin Boyolali':
        employeeSelect.append('<option>Ms Ayun</option>');
        employeeSelect.append('<option>Ms Ana </option>');
        employeeSelect.append('<option>Ms Nisa</option>');
        employeeSelect.append('<option>Ms Fajar</option>');
        employeeSelect.append('<option>Ms Dian</option>');
        employeeSelect.append('<option>Ms Nia</option>');
        employeeSelect.append('<option>Ms Iza</option>');
        employeeSelect.append('<option>Ms Ina</option>');
        employeeSelect.append('<option>Ms Rumi</option>');
        employeeSelect.append('<option>Ms Alya</option>');
        employeeSelect.append('<option>Ms Aida</option>');
        employeeSelect.append('<option>Ms Winda</option>');
        employeeSelect.append('<option>Ms Nida</option>');
        employeeSelect.append('<option>Ms Rida</option>');
        employeeSelect.append('<option>Ms Tya</option>');
        employeeSelect.append('<option>Ms Dee</option>');
        employeeSelect.append('<option>Ms Qiqi</option>');
        employeeSelect.append('<option>Ms Dinah</option>');
        employeeSelect.append('<option>Ms Rahma</option>');
        employeeSelect.append('<option>Ms Shilvie</option>');
        employeeSelect.append('<option>Ms Asti</option>');
        employeeSelect.append('<option>Ms Poppy</option>');
        employeeSelect.append('<option>Ms Putri</option>');
        employeeSelect.append('<option>Ms Tika</option>');
        employeeSelect.append('<option>Ms Dewi</option>');
        employeeSelect.append('<option>Joko Santoso</option>');
        employeeSelect.append('<option>Kuntadi</option>');
        employeeSelect.append('<option>Syafi&apos;ul Umam</option>');
        employeeSelect.append('<option>Sunardi</option>');
        employeeSelect.append('<option>Maryanto</option>');
        employeeSelect.append('<option>Nur Halim</option>');
        employeeSelect.append('<option>Jumanto</option>');
        employeeSelect.append('<option>Fadlan Rifai Al Irsyad</option>');
        employeeSelect.append('<option>Muh Amirudin Arrofi&apos;</option>');
        employeeSelect.append('<option>Sidik Rohmanto</option>');
        employeeSelect.append('<option>M Nurokhim Nawawi</option>');
        employeeSelect.append('<option>Rizki Fajar Ramdani</option>');
        employeeSelect.append('<option>Moh Arif Maulana</option>');
        employeeSelect.append('<option>Isnaini Agus Setiono</option>');
        employeeSelect.append('<option>Phaksi Arwendha</option>');
        employeeSelect.append('<option>Habib Hasan</option>');
        employeeSelect.append('<option>Rizqi Ashrifah Qurotaa&apos;yun</option>');
        employeeSelect.append('<option>Fitri Uswatun Khasanah</option>');
        employeeSelect.append('<option>Puji Lestari</option>');
        employeeSelect.append('<option>Wahyu Dwi Fatimah</option>');
        employeeSelect.append('<option>Umahatul Kibriya</option>');
        employeeSelect.append('<option>Umi Robbayani</option>');
        employeeSelect.append('<option>Lia Vibrianti</option>');
        employeeSelect.append('<option>Athifatun Najiyah</option>');
        employeeSelect.append('<option>Bilkhis Sri Maharani</option>');
        employeeSelect.append('<option>Tsabita Faiz Ihsani</option>');
        employeeSelect.append('<option>Catur Rimadloni Pujarwati</option>');
        employeeSelect.append('<option>Intan Jannah Dikhawati</option>');
        employeeSelect.append('<option>Faradila Ardana</option>');
        employeeSelect.append('<option>Lailatul Azizah</option>');
        employeeSelect.append('<option>Festa Enjelysa Septiani</option>');
        employeeSelect.append('<option>Syifa Kusuma</option>');
        employeeSelect.append('<option>Maesaroh</option>');
        employeeSelect.append('<option>Melinda Nur Cahyaningrum</option>');
        employeeSelect.append('<option>Retno Wiyanti</option>');
        employeeSelect.append('<option>Fatimah Az Zuhri</option>');
        break;
        case 'Alabidin Sukoharjo':
        employeeSelect.append('<option>Rusdi Ana Lutfi</option>');
        employeeSelect.append('<option>Isti Choirunnisa&apos;</option>');
        employeeSelect.append('<option>Siti Fatimah</option>');
        employeeSelect.append('<option>Nur Rohmawati</option>');
        employeeSelect.append('<option>Anisa Fathaniah Anwar</option>');
        employeeSelect.append('<option>Andira Koza Laksita</option>');
        employeeSelect.append('<option>Amalia Nisa Sholehah</option>');
        employeeSelect.append('<option>Aulia Umi Valentina</option>');
        employeeSelect.append('<option>Weni Aprilia Pradani</option>');
        employeeSelect.append('<option>Dinda Rendrasetya</option>');
        employeeSelect.append('<option>Putri Apriliana </option>');
        employeeSelect.append('<option>Arini</option>');
        employeeSelect.append('<option>Hilya Fauziah Hasanuddin</option>');
        employeeSelect.append('<option>Yuli Purwatiningsih</option>');
        employeeSelect.append('<option>Shalindri Saraswati</option>');
        employeeSelect.append('<option>Putri Nurika Anggraini</option>');
        employeeSelect.append('<option>Nur Afifah</option>');
        employeeSelect.append('<option>Anas Tas Nia Dewi</option>');
        employeeSelect.append('<option>Annisa Dwai Nursanti</option>');
        employeeSelect.append('<option>Us Nuha</option>');
        employeeSelect.append('<option>Ahma Nur Aisyah</option>');
        employeeSelect.append('<option>Nilna Dati Layyina</option>');
        employeeSelect.append('<option>Yanu Toki Melliani</option>');
        employeeSelect.append('<option>Rosmalita Putri Isnaini</option>');
        employeeSelect.append('<option>Fatimah Zakiyah</option>');
        employeeSelect.append('<option>Dinda Nadilla Sandy</option>');
        employeeSelect.append('<option>Ika Devi Pancasilawati</option>');
        employeeSelect.append('<option>Amalia Nisa Sholehah</option>');
        break;
        case 'Alabidin Karanganyar':
        employeeSelect.append('<option>Ms Dhila</option>');
        employeeSelect.append('<option>Ms Rina</option>');
        employeeSelect.append('<option>Ms Wiwit</option>');
        employeeSelect.append('<option>Ms Ani</option>');
        employeeSelect.append('<option>Ms Dita</option>');
        employeeSelect.append('<option>Ms Ama</option>');
        employeeSelect.append('<option>Ms Esi</option>');
        employeeSelect.append('<option>Ms Widya</option>');
        employeeSelect.append('<option>Ms Lia</option>');
        employeeSelect.append('<option>Ms Esta</option>');
        employeeSelect.append('<option>Ms Tyas</option>');
        employeeSelect.append('<option>Ms Riyani</option>');
        employeeSelect.append('<option>Ms Elka</option>');
        employeeSelect.append('<option>Us Medhika</option>');
        employeeSelect.append('<option>Us Ismi</option>');
        employeeSelect.append('<option>Us Wulan</option>');
        employeeSelect.append('<option>Ms Retno</option>');
        employeeSelect.append('<option>Ms Sita</option>');
        employeeSelect.append('<option>Ms Fitri</option>');
        employeeSelect.append('<option>Ms Rima</option>');
        employeeSelect.append('<option>Ms Nurul</option>');
        break;
        case 'Alabidin Klaten':
        employeeSelect.append('<option>Ms Vela</option>');
        employeeSelect.append('<option>Ms Dewi</option>');
        employeeSelect.append('<option>Ms Retno</option>');
        employeeSelect.append('<option>Ms Yuni</option>');
        employeeSelect.append('<option>Ms Fatim</option>');
        employeeSelect.append('<option>Ms Umi</option>');
        break;
        case 'Alabidin Jogja':
        employeeSelect.append('<option>Kartika Desy Purwanti</option>');
        employeeSelect.append('<option>Fidiana Nurhantari</option>');
        employeeSelect.append('<option>Ajeng Aprilia Husaeni</option>');
        employeeSelect.append('<option>Mefta Rizki Qurrot &apos;Aini</option>');
        employeeSelect.append('<option>Alyarahma Nur Aisya</option>');
        employeeSelect.append('<option>Muh Naufal</option>');
        employeeSelect.append('<option>Muh Nadir</option>');
        break;
        case 'SMA ABBS':
        employeeSelect.append('<option>Anna Rafaidah</option>');
        employeeSelect.append('<option>Frenika Widyasari</option>');
        employeeSelect.append('<option>Sri Mulyani</option>');
        employeeSelect.append('<option>Fatimah Zahro Assidiqoh</option>');
        employeeSelect.append('<option>Intan Widya Pangestika</option>');
        employeeSelect.append('<option>Virliana Annida Rekkayushar</option>');
        employeeSelect.append('<option>Wiji Setyo Utami</option>');
        employeeSelect.append('<option>Farida Leni Kusumawati</option>');
        employeeSelect.append('<option>Hesti Indah Mifta Nur&apos;aini</option>');
        employeeSelect.append('<option>Ratih Tri Wijayanti</option>');
        employeeSelect.append('<option>Hasna Alfasina</option>');
        employeeSelect.append('<option>Dwi Noviasih Pratama</option>');
        employeeSelect.append('<option>Aulia Nur Ridwan</option>');
        employeeSelect.append('<option>Azhar Umam</option>');
        employeeSelect.append('<option>Achrudin</option>');
        employeeSelect.append('<option>Fandi Agus Irawan</option>');
        employeeSelect.append('<option>Muh Abdul Aziz</option>');
        employeeSelect.append('<option>Rengga Ngesthi Pambuka</option>');
        employeeSelect.append('<option>Putera Islamiyadi R</option>');
        employeeSelect.append('<option>Muh Hafid Rozaqi</option>');
        employeeSelect.append('<option>Amirul Setiawan</option>');
        employeeSelect.append('<option>Abd Azis</option>');
        employeeSelect.append('<option>Abdullah Al Haris Dzulfikri</option>');
        employeeSelect.append('<option>Khoiruddin</option>');
        employeeSelect.append('<option>M. Thoriq Hanafi</option>');
        employeeSelect.append('<option>Zuly Irawan</option>');
        employeeSelect.append('<option>Agung Sularso</option>');
        employeeSelect.append('<option>Alfi Suryani Yusuf</option>');
        employeeSelect.append('<option>Febrianto Agus</option>');
        employeeSelect.append('<option>Muh Zaenuddin</option>');
        employeeSelect.append('<option>Imam Samodra</option>');
        employeeSelect.append('<option>Dhiyas Fatin Nuha</option>');
        employeeSelect.append('<option>Siska Wahyuningtyas</option>');
        employeeSelect.append('<option>Asnia Novitasari</option>');
        employeeSelect.append('<option>Sari Melati K</option>');
        employeeSelect.append('<option>Nina Setyowati</option>');
        employeeSelect.append('<option>Ocnatias Eka Saputri</option>');
        employeeSelect.append('<option>Titik Purwanti</option>');
        employeeSelect.append('<option>Uswatun Hasanah</option>');
        employeeSelect.append('<option>Nurul Hidayah Fitriyani</option>');
        employeeSelect.append('<option>Fitri Nur Hardiyani</option>');
        employeeSelect.append('<option>Anggi Puspa WW</option>');
        employeeSelect.append('<option>Qothrunnada</option>');
        employeeSelect.append('<option>Salma Khoirun Nisa</option>');
        employeeSelect.append('<option>Fatimah Zahra</option>');
        employeeSelect.append('<option>Nur Mashitoh</option>');
        employeeSelect.append('<option>Ms Nita Admin</option>');
        employeeSelect.append('<option>Rini Kurniasih</option>');
        employeeSelect.append('<option>Nur Shoya Riyana</option>');
        employeeSelect.append('<option>Sela Mawarti</option>');
        employeeSelect.append('<option>Inna Rizki Apriyanti</option>');
        employeeSelect.append('<option>Rahma Nur Afifah</option>');
        employeeSelect.append('<option>Tyas Wisnu Wardani</option>');
        employeeSelect.append('<option>Nasyalina Dwinta</option>');
        employeeSelect.append('<option>Nurul Fadhila Firdaus</option>');
        break;
        case 'LAZ':
        employeeSelect.append('<option>Nadia</option>');
        employeeSelect.append('<option>Syamsiati</option>');
        break;
        default:
        break;
    }
    }

    // Event listener for unit select change
    $('#unitSelect').change(function(){
    var selectedUnit = $(this).val();
    // Update employee options based on selected unit
    updateEmployeeOptions(selectedUnit);
    });

    // Initialize employee options based on default unit
    updateEmployeeOptions($('#unitSelect').val());
});

// Function to change input type to text
function changeInputType() {
    var employeeInput = $('#employeeSelect');
    employeeInput.replaceWith('<input type="text" class="form-control" id="employeeInput" placeholder="Masukkan nama lengkap karyawan" name="entry.1496297916">');
}

// Function to validate attendance code before submitting form
function validateAttendanceCode() {
    var attendanceCode = $('#attendanceCodeInput').val();
    // Your validation logic here
    if (attendanceCode !== 'bersama') {
        $('#attendanceCodeError').text('Kode hadir tidak valid.');
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}

// Event listener for form submission
$('form').submit(function(event) {
    // Prevent default form submission
    event.preventDefault();
    // Validate attendance code
    if (validateAttendanceCode()) {
        // Proceed with form submission
        this.submit();
    }
});
