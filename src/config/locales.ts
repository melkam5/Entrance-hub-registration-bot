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
           
            🎖  Your current  point is ${(ctx.userData.points*referalBonus.point_valueBirr)-ctx.userData.credited} Birr
            👥  Invited people ${ctx.userData.invited.length-1} 
            🫂  Successfully joined people ${ctx.userData.payed.length-1}
           
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
            `
    } ,
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
        `
    }
}