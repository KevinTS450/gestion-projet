<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailSender extends Mailable
{
    use Queueable, SerializesModels;

    public $recipientName;
    public $code_activation;
    public $subject;
    public $recipientEmail;
    public $type;
    /**
     * Create a new message instance.
     */
    public function __construct($subject,$recipientName,$code_activation,$recipientEmail ,$type)
    {
        $this->recipientName = $recipientName;
        $this->recipientEmail = $recipientEmail;
        $this->subject=$subject;
        $this->code_activation=$code_activation;
        $this->type=$type;

    }

  

    public function build()
    {
        
        $imageUrl = asset('/welcome-greeting-message.png');
        $activationEmail =$this->recipientEmail;
        $lien = 'http://localhost:3000/Activation/';
        return $this
        ->subject($this->subject.'!')
        ->view('email_template/email_template')// Blade view for email content
        ->with(['recipientName' => $this->recipientName,
                     'code_activation' => $this->code_activation,
                     'imageUrl' => $imageUrl,
                     'lien' => $lien,
                     'type' =>$this->type
                    ]);
        }

    /**
     * Attach an additional attachment.
     *
     * @param string $attachmentPath
     * @param array $options
     * @return $this
     */
    public function attachAdditionalAttachment($attachmentPath, $options = [])
    {
        return $this->attach($attachmentPath, $options);
    }

}
