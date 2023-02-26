import { MyContext } from "../types/context.type";
import { referalBonus, bot_user_name } from "./botData";

export const loc  = {
    eng :
        {   menu_register : '❇️ Register',
            menu_language : '🌐 Language',
            menu_invite : '🧧 Invite',
            menu_contact : '📥 Contact us',
            menu_help : '〽️ Help',
            menu_social : 'Social Science',
            menu_natural : 'Natural Science',

            message_ask_name : 'Tell us your full name _',
            meassge_ask_school : "what is your school's name ?",
            message_ask_contact : 'Please share your contact _',
            message_ask_grade:'Select your grade .',
            message_ask_stream:'Select your Stream .',
            message_ask_bank:'Which one of bank do you  prefer .',
            message_ask_proof : `Send me a photo or trasaction id as a payment proof _
        /cancel !
        `       ,
                        
           
            message_account_number : 'Account Number',
            message_accountName : 'Name',
            message_amount : 'Amount',
            
            message_success_contact : 'Contact successfully registerd ✔️.',
            message_success_lang: 'Language changed to English',
            message_success_proof : `Received ✔️
        Wait untile your request is procced .` ,
            message_success_approved : (ivtlink : 'kl')=>(
            `
            
        You are approved , use the following link to join . ! Beware this is a one time link  ,
        ${ivtlink} `),
            message_data_cleared :'Your data is cleared .',
            message_failed_request : 'Your request is declined ',
            message_notify_registerd :'You are already registerd .',
            message_wait_forReview :'Please wait untile we proced your request , pending',


            notify_langSelected : 'English is selected',
            message_select_option : 'Select an option',

            message_invite_join:(ctx : MyContext )=>`Hey ${ctx.userData.first_name} ,
Please Join our Channel with the button below to continue 😊.`,
            message_invite_page : (ctx : MyContext) => `
➖➖➖➖➖➖➖➖➖➖➖➖➖

🎖  Your current  point is ${(ctx.refferalData.payed*referalBonus.point_valueBirr)-ctx.userData.credited} Birr
👥  Invited people ${ctx.refferalData.invited} 
🫂  Successfully joined people ${ctx.refferalData.payed}

💰 Cashed out Amount:  ${ctx.userData.credited} Birr

➖➖➖➖➖➖➖➖➖➖➖➖➖
💥 The percent per successfully joined people is ${referalBonus.point_value}% .
💰 The minimum amount you can withdraw is ${referalBonus.minwith_value} Birr .
    ㅤ
    
👇 Share this link to invite :
https://t.me/${bot_user_name}?start=ehr${ctx.userData.tg_id}
                  ` ,
            message_contact : `📥 Contact us
            ➖➖➖➖➖➖➖➖➖➖➖➖➖
           
            ✍️ Inbox  : @EntranceHub_Admin
            💌 E-Mail : entrancehubtutorials@gmail.com
            📞 Call   : 0917318110
            ☎️ Call   : 0948398047
            🤖 Developer : @melkam_5
            `,

            message_select_grade : `➖➖➖➖➖➖➖➖➖➖➖➖➖➖
     
      ▪️ Select your grade . 
            
    ➖➖➖➖➖➖➖➖➖➖➖➖➖➖
            `,
            message_select_Bank : `➖➖➖➖➖➖➖➖➖➖➖➖➖➖
     
      ▪️ Which one of bank do you  prefer . 
            
    ➖➖➖➖➖➖➖➖➖➖➖➖➖➖`,
            message_select_stream : `➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    
      ▪️ Select your Stream . 
           
    ➖➖➖➖➖➖➖➖➖➖➖➖➖➖` ,
                message_data_cleared_two: `
➖➖➖➖➖➖➖➖➖➖➖➖➖➖

⁉️ your data is cleared  

➖➖➖➖➖➖➖➖➖➖➖➖➖➖
                `
    ,
message_helpmenu_one : `‼️ወደ Entrance Hub Ethiopia ለመዝገብ ምን ምን ያስፈልገኛል❓ 

🥇ኛ ፣  ወደ Entrance hub ትምህርት ቤት ለመቀላቀል ሲያስቡ ፣ በቀዳሚነት ለመማር ፣ ለማወቅ ፣ ለመሸለም ዝግጁ መሆኖን ያረጋግጡ‼️

🎁እኛ ጋር መማር ያሸልማል ፣ የእውቀቶ አድማስ ከፍ ባለ ቁጥር የመሸለም ደረዳዎ በእጥፍ ይደረጃል።  ምክንያቱም በ Entrance Hub ማወቅ ብቻም ሳይሆን ፈጣሪም ትውልድ ለመፍወር ተግተን እንሰራለን ። 

🥈ኛ ፣ Entrance hub Ethiopia ለመቀላቀል ሲያስቡ ፣ በ2ኛ ደረጃ የግሎ ደብተር ወይም ደግሞ ማስታወሻ መያዞን አይርሱ‼️

🏆እኛ ልዩ ነን የምንለው በምክኒያት ነው ‼️ ምክንያቱም በእኛ ብቻ የምታገኟቸው ልዩ የማስታወሻ ፣ Trick እና Formula ይኖራሉ እና በተገቢው መልኩ ማስታወሻ ላይ ሊሰፍሩ ይገባል ❗️

🥉ኛ ፡ ወደ Entrance Hub የትምህርት ማዕከል ለመቀላቀል 150 ብር ቅድሚያ መክፈል ይኖርቦታል ።
በዚህ መሰረት ፣ ለ Tutorial ወይም ደግሞ ለትምህርቶ  ከ9ኛ እስከ 12ኛ በ3ቱም የትምህርት አሰጣጥ ማለትም በቪድዮ ፣ በድምጽ ፣ በTelegraph ለመከታተል 100 ብር ሲሆን የኢትዮጵያ Entrance Examination ወይም ደግሞ የዩንቨርሲቲ መግቢያ ፈትና ከ1990 እስከ 2015 ዓ.ም ሙሉ Exam book እና የ10ኛ የPreparatory መግቢያ ፈትና ከ 1995_2009 ዓ.ም Exam book ሁሉንም በአንድ ላይ ለማግኘት 50 ብር እንዲከፍሉ  እናሳስባለን ‼️

‼️እርሶ የከፈሉት 150 ብር ትምህርት ከተጀመረበት ሰዓት ጀምሮ ለ3 ወር በተከታታይ Tutorial ለመከታተል እና በተጨማሪም የዩኒቨርሲቲ መግቢያ እና የመሰናዶ መግቢያ ፈተናዎች ከ1 ወር ቀደም ብሎ ከላይ የተጠቀሱት ዓ.ም ሁሉንም እስከ የ2015 የዩንቨርሲቲ መግቢያ ፈትና ቀን ድረስ ይቀርባል።

4️⃣ኛ ፡ ወደ Entrance Hub የትምህርት ማዕከል ለመቀላቀል ሲያስቡ ፣ ህልሞ እውን እንደሚሆን እርግጠኛ መሆን ይቻላሉ። Entrance Hub መማር እና ማስተማር ብቻም ሳይሆን ለሁሉም የኢትዮጵያ ተማሪዎች ስራን ይፈጥራል ። 

❗️ወደ Entrance Hub የትምህርት ማዕከል በመጋበዝ ብቻ የፈለጉት የብር መጠን ያህል ተከፋይ ይሆናሉ ። በስራዎት ልክ የመከፈል አቅሞን በማሳደግ በትምህርትም ብቻም ሳይሆን በገንዘብም ብቁ ሃብታም ለማድረግ ተግተን እንሰራለን ‼️ ወደ እኛ ተማሪን ሲጋብዙ በአንድ ተማሪ በአማካኝ ከ15% በላይ ይከፈሎታል ። ❗️በዚህ መሰረት 100 ተማሪዎችን ወደ እኛ ቢጋብዙ ከ2000 ብር በላይ ወዲያውኑ በባንክ አካውንቶ እናስገባሎታለን። እርሶ ምንም ሳይደክሙ በትምህርት ቤት ፣ በYou tube ፣ በቴሌግራም ፣ በባነር በመስራት ወዳጅ ዘመዶን በመጋበዝ ሽልማቶን ይቀበላሉ።

መልካም የትምህርት ዘመን እንዲሆንሎት ከወዲሁ እንመኛለን ‼️
💯Entrance hub Ethiopia 💯
` ,
message_helpmenu_two : `ወደ Entrance Hub Ethiopia እንዴት መመዝገብ እችላለሁ❓‼️

🎁ወደ Entrance Hub ለመዝገብ ዝግጁ ሲሆኑ እነኝህን የመመዝገቢያ መንገዶችን ቢያከናውን ይበልጥ ይመከራል ። 

1️⃣ኛ ፡ ለEntrance Hub አዲስ ከሆኑ በTelegram Search bar ላይ @EntrnaceHubEthiopia ብለው ሲፈልጉ በመጀመርያ ላይ የሚመጣው ቻናል ፣ በመቀላቀል ቀን በቀን ስለ Entrance Hub Ethiopia የሚለቀቁትን መረጃ በመከታተል ምዝገባውን መፈጸም ይችላሉ።  

2️⃣ኛ፡ ቀጥታ ከመመዝገቢያው የEntrance Hub payment bot ውስጥ በመግባት እነኝህን መንገዶች በመገንዘብ ምዝገባውን መፈጸም ይችላሉ ። 

🥇ኛ ፡ እሄንን Bot በቅድሚያ  @Entrancehub_payment_bot "Start " ይሉታል ። 
በመቀጠል ከሚመጡት አማራጮች መካከል 
"ቋንቋ ይምረጡ" ፣ አማርኛ ፣ English አልያም ደግሞ Afaan Oromo ከሚሉት ውስጥ ይፈልጉትን ቋንቋ ይመርጣሉ ። 

🖊️እኛ ለ ማስተማሪያ አማርኛን መርጠናል ። ቀጥሎ ከሚመጣሎት አማራጮች ስም እና አድራሻ ይጠይቆታል እና በተከታታይ በጥያቄው አማራጭ መሰረት ሙሉ ስሞን እና ትምህርት ቤቶን ያስገባሉ ። 

✒️በመቀጠል በተከታታይ  ስልክ ቁጥሮን እና አድራሻዎን ያጋሩ የሚለውን ቅጽ በመንካት ፣ ስልክ ቁጥሮን እና አድራሻዎትን ያስመዘግባሉ ‼️

በመቀጠል ፣ አሁን ወደ መጨረሻ የመመዝገቢያ ቅጽ ላይ ደርሰናል ‼️ 

‼️በቅድሚያ ❗️ለመዝገብ❗️ የሚለውን Botton እንመልከት። 

❗️ለመዝገብ ሲፈልጉ ፣ ለመዝገብ የሚለውን ቅጽ ይነካሉ ፣ በመቀጠል  የክፍል ደረጃዎትን ይምረጡ የሚል ቅጽ ይመጣል ። Grade 12 የሚለውን በመንካት የትምህርት ዘርፎን ይመርጣሉ ። የተፈጥሮ ሳይንስ እና የማህበራዊ ሳይንስ ከሚሉት ውስጥ የእርሶን የትምህርት ዘርፍ ❗️ሲነኩ ❗️ የክፍያ አማራጮች ይማጣሎታል‼️  በፈለጉት የክፍያ አማራጮችን በመንካት ❗️ተላልፏል❗️ የሚለውን ቅጽ Click ያደርጉ እና 150 ብር የከፈሉበት ደረሰኝ አልያም Transcription Number ይልኩታል። ከእናንተ የሚጠበቀውን ነገር ሁሉም አከናወነዋል ‼️ 🥰
 እኛ አረጋግጠን ፣ ❗️በ5 ደቂቃ❗️ ውስጥ የመግቢያ Link እንልክሎታለን። 

❗️ልብ በሉ ፣ የሚላክሎት Link ለእርሶ ብቻ ነው ‼️ ወደ ሌላ Forward ከተደረገ ፣  አልያም ፣ ሌላ ተማሪ ከገባበት እርሶ ደግመው እኛን መጠየቅ አይችሉም ‼️` ,

message_helpmenu_tree : `‼️Entrance hub galma'uf Mal maltu nu barbachisaa ⁉️

1⃣mana barumsaa Entrance hub  misensaa ta'uuf yoo fetaan  jalqabaa : barachuuf,bekuu fi badhafamuuf  qophii ta'uu keessaan mirkaneffadhaa‼️

😎Nuu waliin yoo barataan ni badhafamtuu waan ta'eef,sadarkaa bekkumsaa kessaan akkuma dabala demuun sadarkaan badhaasa kessaniis dachaan dabalaa deema.   sababnii isaas Entarance hubin bekuu qofaa osoo hin tanee dhalotaa 'creative' ta'ee ijaruuf halkaani guyyaa hojjennaa 
2⃣ Miseensaa ta'uu yoo fetaan dabtaraa yadannoo qabachuu hin dagatinaa‼️
✅mannii barumsaa kenyaa hundaa callaa kan jennuu sababa fii,sababnii isaas  nuu biraa qofattii kan argattaan yadannowan addaa addaa,trick fi formula ni jiruu waan ta'eef kanafuu dabtaraa yadannoo kessan irraattii qabachuun barbachisadhaa
 3⃣ Miseensaa entrance hub ta'uuf jalqabaa qarshii 150 isiin kafalchisaa  : kana jechuun keenya tutorialif kutaa 9-12  bifaa sadiin jechunis videon ,audio fii bifaa barrefaman kennuuf qarshii 100 yoo ta'uu ,akkasumas qormataa biyyolessaa kutaa 10 baraa 1995-2009 fi qormata biyyolessaa sensaa university dalaguf qarshii 50 isiin kafachisaa

‼️ qarshii isiin yeroo jalqabaf kafaltan  barumsii egalamee batiwwaan walittii anan sadiif  tutorial  Fi qormataa biyyolessaa waliin nu dalagsisaa 

 4⃣  entrance hub yoo miseensaa taatan kayyoo fi  abjuun kessan akkaa dhugomuu hin yadda'inaa. Entrance hub  barumasaa qofaa osoo hin tanee barattoota isattiif hojiin ni waan banuuf .
❗️hiriyotaa keessaa garaa mana barnotaa online Entrance hub afferudhan   badhafamtotaa ni ta'uu jechuu dha. hojiin keessanin  sadarkaa badhasaa kessanii guddifachuun barumsaa qofaan osoo hin taane  qarshidhaniis  duressaa isiin  tasisuuf halkaniif guyyaa ni hojjennaa . garaa chanali Barnoota kenyaa yemmuu misensaa nuuf affertaan gidduugalessan baratattii 15% isiinif kafalamaa ❗️.halumaa kanan barataa 100 yemmuu affertan qarshii 2000 Fi isaa ol karaa accounti bankii  kessanitin isiin badhafnaa .❗️kottaa❗️  osoo homaa hin dadhabin  ,mana barumsattii ,YouTube kessanin , telegrami fi banarii keessaan fayadamu dhan hiriyotaa kessaan afferun badhafama ta'aa 

Baraa barnotaa garii akkaa isiinif ta'uuf asuman hawwii keenya ibsinaa    🔆🔅🔅
💯Entrance hub Ethiopia 💯 filannoo jalqabatii`
            },
    amh :
        {   menu_register : '❇️ Register',
        menu_language : '🌐 Language',
        menu_invite : '🧧 Invite',
        menu_contact : '📥 Contact us',
        menu_help : '〽️ Help',
        menu_social : 'Social Science',
        menu_natural : 'Natural Science',

        message_ask_name : 'Tell us your full name _',
        meassge_ask_school : "what is your school's name ?",
        message_ask_contact : 'Please share your contact _',
        message_ask_grade:'Select your grade .',
        message_ask_stream:'Select your Stream .',
        message_ask_bank:'Which one of bank do you  prefer .',
        message_ask_proof : `Send me a photo or trasaction id as a payment proof _
    /cancel !
    `       ,
                    
    
        message_account_number : 'Account Number',
        message_accountName : 'Name',
        message_amount : 'Amount',
        
        message_success_contact : 'Contact successfully registerd ✔️.',
        message_success_lang: 'Language changed to English',
        message_success_proof : `Received ✔️
    Wait untile your request is procced .` ,
        message_success_approved : (ivtlink : 'kl')=>(
        `
        
    You are approved , use the following link to join . ! Beware this is a one time link  ,
    ${ivtlink} `),
        message_data_cleared :'Your data is cleared .',
        message_failed_request : 'Your request is declined ',
        message_notify_registerd :'You are already registerd .',
        message_wait_forReview :'Please wait untile we proced your request , pending',


        notify_langSelected : 'English is selected',
        message_select_option : 'Select an option',

        message_invite_join:(ctx : MyContext )=>`Hey ${ctx.userData.first_name} ,
        Please Join our Channel with the button below to continue 😊.`,
        message_invite_page : (ctx : MyContext) => `
        ➖➖➖➖➖➖➖➖➖➖➖➖➖
    
        🎖  Your current  point iBirr
        
            ㅤ
            
        👇 Share this link to invite :
        https://t.me/${bot_user_name}?start=ehr${ctx.userData.tg_id}
            ` ,
        message_contact : `📥 Contact us
        ➖➖➖➖➖➖➖➖➖➖➖➖➖
    
        ✍️ Inbox  : @EntranceHub_Admin
        💌 E-Mail : entrancehubtutorials@gmail.com
        📞 Call   : 0917318110
        ☎️ Call   : 0948398047
        🤖 Developer : @melkam_5
        `,

        message_select_grade : `➖➖➖➖➖➖➖➖➖➖➖➖➖➖
 
  ▪️ Select your grade . 
        
➖➖➖➖➖➖➖➖➖➖➖➖➖➖
        `,
        message_select_Bank : `➖➖➖➖➖➖➖➖➖➖➖➖➖➖
 
  ▪️ Which one of bank do you  prefer . 
        
➖➖➖➖➖➖➖➖➖➖➖➖➖➖`,
        message_select_stream : `➖➖➖➖➖➖➖➖➖➖➖➖➖➖

  ▪️ Select your Stream . 
       
➖➖➖➖➖➖➖➖➖➖➖➖➖➖` ,

message_data_cleared_two: `
➖➖➖➖➖➖➖➖➖➖➖➖➖➖

⁉️ your data is cleared  

➖➖➖➖➖➖➖➖➖➖➖➖➖➖
                `
    }
}