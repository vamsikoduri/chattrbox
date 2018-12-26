import $ from 'jquery';

import md5 from 'crypto-js/md5';


function createGravatarURL(userName)
{
    let userhash = md5(userName);
    return `http://www.gravatar.com/avatar/${userhash.toString()}`;
}


export function promptForUserName()
{
    let userName = prompt('Enter a userName please');
    return userName.toLowerCase();
}

export class ChatForm{

    constructor(formSel,inputSel)
    {
        this.$form = $(formSel);
        this.$input = $(inputSel);
    }

    init(submitCallback){
        this.$form.submit((event) => {
            event.preventDefault();
            let val = this.$input.val();
            submitCallback(val);
            this.$input.val('');
        });
        this.$form.find('button').on('click', () => this.$form.submit())
    }

    
}


export class ChatList {
    constructor(listSel, userName)
    {
        this.$list = $(listSel);
        this.userName  = userName;
    }




    drawMessage(data)
    {
       let u = data['user']
       let t = data['timeStamp']
       let m = data['message']
       
       let $messageRow = $('<li>',{
            'class':'message-row'
        });

        if(this.userName === u)
        {
            $messageRow.addClass('me');
        }

        let $message = $('<p>');

        $message.append($('<span>',{
            'class': 'message-username',
            text:u

        }));

        $message.append($('<span>',{
            'class': 'timestamp',
            'data-time':t,
            text: (new Date(t)).getTime()

        }));

        $message.append($('<span>',{
            'class': 'message-message',
            text:m
        }));


        let $img =$('<img>',{
            src: createGravatarURL(u),
            title: u
        });

        $messageRow.append($img);
        $messageRow.append($message);
        this.$list.append($messageRow);
        $messageRow.get(0).scrollIntoView();

    }
}