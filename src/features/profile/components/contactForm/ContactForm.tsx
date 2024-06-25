'use client';
import {  useState } from "react";
import clsx from "clsx";
import axios from "axios";

import styles from "./ContactForm.module.scss";
import { LoadingIcon } from "@/components/elements/icon/loadingIcon/LoadingIcon";
import { ContactInput } from "@/components/elements/input/ContactInput";

type Input = {
  value?: string;
  hasError: number;
  label: string;
  type: "text"|"email"|"textarea"|"password";
  nameLabel: string;
  autocomplete?: "name"|"email";
  require?: boolean;
  placeholder?:string;
}

export const ContactForm = ()=>{
  const [isSending,setIsSending] = useState<boolean>(false);
  const [isSendError,setIsSendError] = useState<boolean>(false);
  const [isSendSuccess,setIsSendSuccess] = useState<boolean>(false);
  const [formArgs,setFormArgs] = useState<Array<Input>>(
    [
      {
        value: "",
        hasError: 0,
        label: "name",
        type: "text",
        nameLabel: "name",
        autocomplete: "name",
        require: true,
      },
      {
        value: "",
        hasError: 0,
        label: "mail address",
        type: "email",
        nameLabel: "email",
        autocomplete: "email",
        require: true,
      },
      {
        value: "",
        hasError: 0,
        label: "message",
        type: "textarea",
        nameLabel: "text",
        require: true,
      },
    ]
  )

    const setError = (
    {index,errorState}:
    {index:number,errorState:number}) =>{
      const newValue = [...formArgs];
      newValue[index].hasError = errorState
      setFormArgs(newValue)
    }

  const setValue = ((
    {index,valueString}:
    {index:number,valueString:string}
  )=>{
    const newValue =[...formArgs];
    newValue[index].value = valueString
    setFormArgs(newValue)
  })

 const onSend = async(e:React.FormEvent<HTMLButtonElement>) =>{
  e.preventDefault();
  if(isSending)return
  const validation = formArgs.every((el) => ( !el.require || (el.require && el.value && !el.hasError)));
  if(validation === true){
    setIsSending(true);
    await onSendMail();
  }else{
    const emptyIndex:Array<number|null> = formArgs.map((el, index) => (el.require && !el.value ? index : null))
    .filter((index) => index !== null);
    emptyIndex.length>0 && emptyIndex.forEach((num)=>{
      num!==null&&setError({index:num,errorState:1});
    })
  }
  }

  const onSendMail = async()=>{
    const sendData = formArgs.map((el) => {
      return { name: el.nameLabel, label: el.label, value: el.value };
    });
    await axios.post( process.env.NEXT_PUBLIC_SEND_MAIL_URL+'', sendData, {
      withCredentials: true,
    }).then((res)=>{
      setIsSending(false);
      setIsSendSuccess(true);
    }).catch((error)=>{
      setIsSending(false);
      setIsSendError(true)
    })
  }

  return(
    <div className={styles.form} id="js-scrollTarget">
       { isSendSuccess && 
         <p className={styles["form__send-success"]}>お問い合わせありがとうございました</p>
        }
      { !isSendSuccess && 
      <form>
        {formArgs.map((el,index)=>(
          <div className={clsx(styles.form__field , isSending && styles.sending)} key={index}>
            <ContactInput {...el} setError={setError} setValue={setValue} inputIndex={index} />
          </div>
        ))}
        {!isSending ?
        <button
        type="submit"
        className={styles.form__btn}
        onClick={(e:React.FormEvent<HTMLButtonElement>)=>onSend(e)}
        >
          <span className="upper">send message</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="21.061" height="20.707" viewBox="0 0 21.061 20.707">
            <g transform="translate(-5131.691 -1494.793)">
              <path  d="M5132.044,1495.146l10,10-10,10" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="1"/>
              <path  d="M5142.044,1495.146l10,10-10,10" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="1"/>
            </g>
          </svg>
        </button>
        :
        <p className={styles.form__btn}>
        <span className="upper">sending</span>
        <LoadingIcon/>
        </p>
        }
        { isSendError && 
          <p className={styles["form__send-error"]}>
            送信できませんでした<br />もう一度お試し下さい
          </p>
        }
      </form>
      }
  </div>
  );
}