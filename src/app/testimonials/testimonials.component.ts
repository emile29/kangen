import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

    websiteName = '';
    testimonials = [
      {
        img: "assets/images/testimonials/mamta.png",
        header: "",
        para1: "After only a few days drinking Kangen Water, my family and myself could feel super \
        hydrated and sleep peacefully despite a long tiring day.",
        para2: "And during my holidays in Dubai where I had to drink bottled water, I realized that Kangen water is much \
        lighter to drink and has a much more pleasant taste. I also noticed pimples on my face and my skin turned dry. \
        These were remedied as soon I resumed with Kangen water, upon my return to Mauritius.",
        para3: "Kangen water has definitely changed our lives. It's the best investment that I could have ever made so far.",
        name: "Mamta Ramlugun",
        place: "Mauritius (Vacoas)",
        email: "mamtaramlugun@gmail.com",
        phone: "+230 5252 0710"
      },
      {
        img: "assets/images/testimonials/aris.png",
        header: "",
        para1: "I finally bought my own K8 Kangen machine. I have been getting Kangen water from friends for the last two years. Since the first day, I tried Kangen water, I noticed a significant change in my body and my life.",
        para2: "I used to have a heavy headache after poor sleep, intense work or bad events. The first time I tried Kangen water, I was preparing for a professional exam. 3 days later, I realized that I didn't have any headache even if I was sleeping only for 3 to 4 hours.",
        para3: "Now, I can easily drink 2 to 3 liters of Kangen Water every day, which was impossible before with bottled water. Adding to that, Kangen water has made me save around CA$ 900 per year on plastic bottled water for our big family of 6.",
        name: "Aris Ilunga",
        place: "London, Canada",
        email: "arilunga@gmail.com",
        phone: "+1-519-868-4375"
      },
      {
        img: "assets/images/testimonials/edith.jpg",
        header: "",
        para1: "I have been battling with recurrent heartburns (acid reflux) since my late teenage years and of course it gets worse during pregnancy. Doctors have prescribed antacids which give me some temporary relief but nothing in the long term.",
        para2: "Fast forward, my husband's friend introduced us to Kangen water. \
        My husband tried it first, then he recommended it to the entire family. For a few weeks, I didn't think anything of it, till I realised I could not remember the last time I had those nasty heartburns.",
        para3: "I asked myself, what I'm I doing differently, and it dawned on me that I had changed my water. Wish I had tried it earlier. My body is happy and I'm happy!",
        name: "Edith Mills",
        place: "Canada (Welland)",
        email: "edmill83@gmail.com",
        phone: "+1-613-407-7134"
      },
      // {
      //   img: "assets/images/testimonials/lynn.jpg",
      //   header: "improved sleep, better digestion, energy up",
      //   para1: "Kangen water was truly an eye opener for me, with its good hydration benefits.",
      //   para2: "Having had a car accident a year ago and having to spend quite a chuck of the year immobile, my body was \
      //   quite lethargic. I was also dealing with insomnia and frequent indigestion and heartburn. 3 days into the \
      //   Kangen water trial my energy was up, i was able to walk distances that i was previously struggling with. \
      //   My sleeping greatly improved as well as gut issues.",
      //   para3: "I highly recommend Kangen water to those willing to improve their health in a natural way.",
      //   name: "Lynn Mbobua",
      //   place: "Nairobi, Kenya",
      //   email: "kmbobua@gmail.com",
      //   phone: "+254-727-687-013"
      // },
      // {
      //   img: "assets/images/testimonials/diane.png",
      //   header: "more energy, so shining, less throat pain",
      //   para1: 'I am Diane Anaba from Douala, Cameroun. I discovered KANGEN water through a good friend. I wanted to do KANGEN experience. The water is just great. I feel good in my body, sleep better, more energy and lighter. My companion said to me that" you are particulary so shining". ',
      //   para2: "I then sent some Kangen water to my brother-in-law, in Yaoundé. He has cancer of throat. Before he had pain throat and a persistent cough. Now, after drinking Kangen, the pain has lessened and he coughs less. I begin proposing Kangen water now to other sick people.",
      //   para3: "My eyes are opened now. I saw the KANGEN light.",
      //   name: "Diane Anaba",
      //   place: "Douala, Cameroon",
      //   email: "tsogoanaba@gmail.com",
      //   phone: "+237-677-645-674"
      // },
      {
        img: "assets/images/testimonials/neena.jpg",
        header: "",
        para1: "I used to be overwhelmed with my work, feel tired all the time, could not sleep well, and was struggling with obesity. And since I bought my K8 Machine and consuming solely KANGEN water, my blood tests have improved. I sleep well and feel more energetic. I lost around 8 kgs and the swelling of my feet has reduced.",
        para2: "",
        para3: "My whole family is now enjoying the benefits of KANGEN water. We love the taste. My 3 kids are now more immune to the seasonal flu and my hubby joint pains are now gone. We have also reduced our spending on medicines and saved around U$600 annually on plastic bottled water.",
        name: "Neena Soorjun",
        place: "Mauritius (Melrose)",
        email: "neenasoorjun@gmail.com",
        phone: "+230-5719-1524"
      },
      {
        img: "assets/images/testimonials/jolie.jpg",
        header: "",
        para1: "I learned about Kangen Water in Ghana. As I was suffering from menstruation problems, terrible back pain, I immediately agreed to test Kangen water, for a month.",
        para2: "In less than 2 weeks, I started to feel positively the Kangen effects in my body and it was unbelievable - the aches and pains disappeared. In short, I had a new body for the better! My menstrual cycle is back to normal...no back pain or cycle abnormalities. Kangen Water revitalized my body. I recommend this Kangen Water to everyone, for the good health of all our body cells.",
        para3: "Today, Kangen Water has become our water for life, with our K8.",
        name: "Jolie Bampengesha",
        place: "Canada (London)",
        email: "jaassilu@gmail.com",
        phone: "+1-519-282-6290"
      },
      {
        img: "assets/images/testimonials/dio.jpg",
        header: "",
        para1: "I'm so grateful to Kangen Water for keeping me in super health for my new challenges in Canada!",
        para2: "",
        para3: "Kangen Water has provided me with greater stamina and mental focus and clarity to cope with my demanding post graduate study in Canada. Myself and my family could all feel the difference, now, with our new K8 Kangen Water machine. And no more the burden to buy and carry bulky plastic bottled water from grocery stores! Kangen Water has changed our lives!",
        name: "Dio Elikem Tay",
        place: "Canada (Welland)",
        email: "dioelikem@yahoo.com",
        phone: "+1-514-515-7905"
      },
      {
        img: "assets/images/testimonials/usman.jpg",
        header: "",
        para1: "I was fortunate to hear about Kangen Water from a good friend in Canada who introduced to me the health benefits of Kangen water and since then, my life has changed completely. After doing my own research, witnessing the amazing worldwide testimonials and the company history of Enagic Japan International, I finally bought my K8 Kangen machine.",
        para2: "",
        para3: "Once I started drinking kangen water, me and my family can never go back. My wife testifies that Kangen water is the best as she could not believe the energy she has now and how she feels years younger! Kangen water has greatly improved our wellness and we feel good inside and out. I can't wait to share this wonderful gift with everyone!",
        name: "Nuruddeen Usman",
        place: "Nigeria (Kano)",
        email: "nuruddeen666@gmail.com",
        phone: "+234-703-497-7586"
      },
      {
        img: "assets/images/testimonials/steph.jpg",
        header: "",
        para1: "I have been drinking Kangen Water since I acquired my JRIV in May 2024.",
        para2: "Having played volley ball at national level for Mauritius for over 20 years, I have always been mindful on how to cope after sports retirement. \
        Kangen Water was the perfect answer. Few days after trying Kangen Water I felt fully energised and hydrated, slept better and lost weight.",
        para3: "The whole family now enjoys Kangen Water, not only for drinking but also for washing vegetables, beauty water, watering plants etc. \
        Kangen Water was definitely an excellent long term health investment for me and my family!",
        name: "Stephanie Neta",
        place: "Mauritius (Albion)",
        email: "ebwoodycraft@gmail.com",
        phone: "+230-5710-0761"
      },
      {
        img: "assets/images/testimonials/denis.png",
        header: "",
        para1: "After changing my country, I changed my water and both events changed my life!",
        para2: "Since our family got our K8, our lives have been transformed. We have been enjoying \
        better wellness, stronger immunity and more vitality. And Kangen water is so delicious, light \
        and easy to drink and digest and it's 100% natural, with full of antioxidants.",
        para3: "I'm now on a global mission to change the lives of as many people and organizations as \
        possible, across the world, with Kangen Water, Anespa, Ukon and emGuarde.",
        name: "Denis Cheong",
        place: "Canada (Toronto)",
        email: "denisltc@gmail.com",
        phone: "+1-647-389-8798"
      },
      {
        img: "assets/images/testimonials/sam.png",
        header: "",
        para1: "We're really happy with our K8! It has been a great investment in the wellness of our family. After drinking the water for 1 year, I have lost almost 7 kgs of body fat that was stubborn to go. We all sleep better and would wake up noticeably rested and refreshed. Drinking Kangen water has given me and my family our quality of life back!",
        para2: "",
        para3: "In addition to the noticeable health benefits, the different pH types of waters give a great flexibility on how we can use the Kangen system in our house. It has also been very good for our skin care, plants, cleaning, removing pesticides from the fruits and vegetables and sanitising the home.",
        name: "Sam Kangau",
        place: "Kenya (Nairobi)",
        email: "sam.kangau@gmail.com",
        phone: "+254-722-223-789"
      }
    ];
    constructor(private dbService: DbService) { }

    ngOnInit() { 
      // this.dbService.getWebsiteName().subscribe(
      //   res => {
      //     this.websiteName = (res.body as any).websiteName;
      //     if (this.websiteName == "kangenkenya") {
      //       $(".main-container").html('<div style="padding: 50px; text-align: center">coming soon</div>');
      //     }
      //   },
      //   err => {
      //     console.log(err)
      //   }
      // );
    }
}
