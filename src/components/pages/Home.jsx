import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar";
import { Element } from 'react-scroll';
import Servicebox from "../Servicebox";
import fimage1 from '../images/post.svg'
import fimage2 from '../images/details.svg'
import fimage3 from '../images/message.svg'
import fimage4 from '../images/videocall.svg'
import fimage5 from '../images/logo.png'


const Home=()=> {
 
  const [inputValue, setinputValue] = useState({Usertype: '', Fullname:'', username:'', Phonenumber:"", Email:"", Password:"", Gender:"",});

  const nullvalue = useState({
    profilepic: null,
    title: null,
    skills:null,
    cv:null,
    additionaldoc:{educations : null,
                certifications: null,},
    gudayhistory:null,
    workhistory:null,
    rating:null,
    description:null,
    portfolio:{link: null,
                 title: null,},
});
  
  let [username, setusername] = useState("")
  let [password, setpassword] = useState("");
    
  const saveData = async () => {
    const isEmpty = value => {
      return value === null ||
             value === undefined ||
             value === '' ||
             (Array.isArray(value) && value.length === 0) ||
             (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0);
    }
    const hasEmptyProperties = Object.values(inputValue).some(isEmpty);
    if(hasEmptyProperties){
      alert("please fillout all of the fileds")
    }
    else{
  try{
      await axios.post("http://localhost:5000/writetodatabase", {Usertype: inputValue.Usertype,Fullname: inputValue.Fullname,username: inputValue.username,  Phonenumber: inputValue.Phonenumber, Email: inputValue.Email, Password: inputValue.Password, Gender: inputValue.Gender,title: "", profilepic: "", nullvalue })
      console.log("data: ", nullvalue)
      setPopup(!popup)
  } catch(error){
      console.log("errorr", error)
  }
}
  }

  let navigate = useNavigate();

      const forLogin = async () => {

        try{
         const responce = await axios.get(`http://localhost:5000/login/${username}`)
         if(!responce || !responce.data ){
          alert("error loging in ckeck your credentials")
          return;
         }
         
         const usercheck = responce.data[0]
         console.log(responce.data)

         if(usercheck.username === username && usercheck.Password === password){
          if(usercheck.Usertype=== "employer"){
            navigate("employerpage", {state:{employerid:usercheck._id }})
          }else if(usercheck.Usertype=== "freelancer"){
            navigate("freelancerpage", {state:{freelancerid:usercheck._id }})
          }
         }else{

          alert("error loging in ckeck your credentials")
         }
         
        }
        catch(error){
          if (error.response && error.response.status === 404) {
          alert("error loging in ckeck your credentials")
          }else{
          console.error("Error checking user:", error);
          }
        }
      } 


  
    const [action, setAction] = useState('');

    const loginLink = () =>{
      setAction('active')
    }
    const registerLink = () =>{
      setAction('')
    }

      const [popup, setPopup] = useState(false);
  
  
  const togglePopup =()=>{
    setPopup(!popup)
  }

  if(popup){
    document.body.classList.add('active-popup')
  } else{
    document.body.classList.remove('active-popup')
  }

  return (
    <div id='main'>
 <Navbar/>
<Element name="main">
        <section>
          {
      <div className='header-heading'>
      <h2>Connecting Freelancers and Employers</h2>
      <h2><span>By Zagol</span></h2>
      
      <div className='header-btns'>
        <button className='header-btn' onClick={togglePopup}>Register Now</button>
      <div className={`wrapper`}>
      {popup && (
        <div className={`popup`}>
        <div onClick={togglePopup} className="overlay"></div>
          <div className={`popup-content${action}`}>
          <div className="login-popup">
        <h3 className="h3-login">LogIn</h3>
        <input className="input" type="text" placeholder='Username' 
        onChange={e=>setusername(e.target.value)}/> 
            <input className="input" type="password" placeholder='Password'
             onChange={e=>setpassword(e.target.value)} /> <br />
            <button className='popup-btn' onClick={forLogin}>LogIn</button>
            <p>Don't have an account. <a href="#" onClick={registerLink}>Register</a></p>
            <button className='popup-btn' id='x' onClick={togglePopup}>X</button>
        </div>
        <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>

            <h3 className="h3-register">Register</h3>
            <input type="radio" name="user" value="freelancer" 
            onChange={e=>setinputValue({...inputValue, Usertype:e.target.value})}/> Freelancer

            <input type="radio" name="user" value="employer"
            onChange={e=>setinputValue({...inputValue, Usertype:e.target.value})} /> Employer <br />

            <input className="input" type="text" placeholder='Fullname' 
            onChange={e=>setinputValue({...inputValue, Fullname:e.target.value})}/>

<input className="input" type="text" placeholder='Username' 
            onChange={e=>setinputValue({...inputValue, username:e.target.value})}/>

            <input className="input" type="text" placeholder='Phonenumber' 
            onChange={e=>setinputValue({...inputValue, Phonenumber:e.target.value})}/>

            <input className="input" type="email" placeholder='Email' 
            onChange={e=>setinputValue({...inputValue, Email:e.target.value})}/> 

            <input className="input" type="password" placeholder='Password' 
            onChange={e=>setinputValue({...inputValue, Password:e.target.value})}/> <br />

            <input className="radio" type="radio" name="gender" value="male" 
            onChange={e=>setinputValue({...inputValue, Gender:e.target.value})}/> Male
            <input className="radio" type="radio" name="gender" value="female"
            onChange={e=>setinputValue({...inputValue, Gender:e.target.value})} /> Female
            <br /> <br />
            <button className='popup-btn' onClick={saveData}  >Submit</button>
            <p>Already have an account. <a href="#" onClick={loginLink}>LogIn</a></p>
            <button className='popup-btn' id='x' onClick={togglePopup}>X</button>
            

      </div>
      </div>
         
      )}
      </div> 
      
    </div>
</div>
          }
        </section>
      </Element>
      <Element name="service">
        <section>
          {
            <div id='service'>
              <h1>Our Services</h1>
          <div className='a-container'>
           <Servicebox image={fimage1} title="post"  dservice="Employers can post jobs/tasks"/>
           <Servicebox image={fimage2} title="apply" dservice="Freelancers can apply on jops of their desier"/>
           <Servicebox image={fimage3} title="messaging" dservice="Direct real time messageing between freelancer and employers"/>
           <Servicebox image={fimage4} title="video chat" dservice="Videochats between freelancers and employers"/>
          </div>
            </div>
          }
        </section>
      </Element>
      <Element name="about">
        <section>
          {
          <div id='about'>
        <div className='about-image'>
       <img src={fimage5} alt='' />
        </div>
        <div className='about-text'>
      <h1>About Us</h1>
      <p>wooooooooooooooooooo</p>
      <button>read more</button>
        </div>
          </div>
          }
        </section>
      </Element>
      <Element name="contact">
        <section >
          {
            <div id='contact'>
              <h1>Contact Us</h1>
              <form>
                <input type="text" placeholder='Fullname' required />
                <input type="email" placeholder='Email' required />
                <textarea placeholder='Write here' name='message'></textarea>
                <input type="submit" value="Send"/>
              </form>
            </div>
          }
        </section>
      </Element>
      <Element >
        <section>
          {
            <div>
             <ul class="wrappersocial">
  <a href="www.facebook.com" class="icon facebook">
    <span class="tooltip">Facebook</span>
    <svg
      viewBox="0 0 320 512"
      height="1.2em"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
      ></path>
    </svg>
    </a>
 <a href="www.twitter.com" class="icon twitter">
    <span class="tooltip">Twitter</span>
    <svg
      height="1.8em"
      fill="currentColor"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      class="twitter"
    >
      <path
        d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
      ></path>
    </svg>
    </a>
  <a href="www.instagram.com" class="icon instagram">
    <span class="tooltip">Instagram</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1.2em"
      fill="currentColor"
      class="bi bi-instagram"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
      ></path>
    </svg>
    </a>
</ul>

            </div>
            
          }
        </section>
      </Element>
      <Element>
        <section>
          {
            <div id='developers'>
              <h4>Developers</h4>
              <p>yanit haftom</p>
              <p>sosena abera</p>
              <p>bontu temesgen</p>
              <p>yanet kassahun</p>
              <p>samson bayisa</p>
            </div>
          }
        </section>
      </Element>
    </div>

  )
  
}

export default Home
