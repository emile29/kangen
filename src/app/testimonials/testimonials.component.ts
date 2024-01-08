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
        img: "https://drive.google.com/uc?export=view&id=164hpmlt7zY4xz4NdZ9GYPqttEy5GEvBx",
        header: "Super hydrated, sleep peacefully, healthy skin",
        para1: "After only a few days drinking Kangen Water, my family and myself could feel super \
        hydrated and sleep peacefully despite a long tiring day.",
        para2: "And during my holidays in Dubai where I had to drink bottled water, I realized that Kangen water is much \
        lighter to drink and has a much more pleasant taste. I also noticed pimples on my face and my skin turned dry. \
        These were remedied as soon I resumed with Kangen water, upon my return to Mauritius.",
        para3: "Kangen water has definitely changed our lives. It's the best investment that I could have ever made so far.",
        name: "Mamta Ramlugun",
        place: "Vacoas, Mauritius",
        email: "mamtaramlugun@gmail.com",
        phone: "+230 5252 0710"
      },
      {
        img: "https://drive.google.com/uc?export=view&id=1QA8qblEgeuvGusxL6nAK5P4v7HClBw8o",
        header: "Headache Relief, easy to drink 2-3 Liters, bottled water savings",
        para1: "I finally bought my own K8 Kangen machine. I have been getting Kangen water from friends for the last two years. Since the first day, I tried Kangen water, I noticed a significant change in my body and my life.",
        para2: "Here is the main reason that motivated me to buy a K8. I used to have a heavy headache after poor sleep, intense work or any bad events. The first time I tried Kangen, I was preparing to write an exam for a professional certification. Three days later, I realized that I didn't have any headache even if I was sleeping only for 4 to 5 hours. Also, I was easily drinking 2 to 3 liters a day, which was almost impossible. I can feel the benefit of Kangen water.",
        para3: "Adding to that, I am saving C$ 1,500 per year on plastic bottled water.",
        name: "Aris Ilunga",
        place: "London, Canada",
        email: "arilunga@gmail.com",
        phone: "+1-519-868-4375"
      },
      {
        img: "https://drive.google.com/uc?export=view&id=1Al5Sh_0jpsdoqmOQ30ka5vO5vWPmUlS1",
        header: "Improved sleep, better digestion, energy up",
        para1: "Kangen water was truly an eye opener for me, with its good hydration benefits.",
        para2: "Having had a car accident a year ago and having to spend quite a chuck of the year immobile, my body was \
        quite lethargic. I was also dealing with insomnia and frequent indigestion and heartburn. 3 days into the \
        Kangen water trial my energy was up, i was able to walk distances that i was previously struggling with. \
        My sleeping greatly improved as well as gut issues.",
        para3: "I highly recommend Kangen water to those willing to improve their health in a natural way.",
        name: "Lynn Mbobua",
        place: "Nairobi, Kenya",
        email: "kmbobua@gmail.com",
        phone: "+254-727-687-013"
      },
      {
        img: "https://drive.google.com/uc?export=view&id=1U3v068I63eGU_mLJO8gil9Jne_PsC9B9",
        header: "More energy, so shining, less throat pain",
        para1: 'I am Diane Anaba from Douala, Cameroun. I discovered KANGEN water through a good friend. I wanted to do KANGEN experience. The water is just great. I feel good in my body, sleep better, more energy and lighter. My companion said to me that" you are particulary so shining". ',
        para2: "I then sent some Kangen water to my brother-in-law, in Yaoundé. He has cancer of throat. Before he had pain throat and a persistent cough. Now, after drinking Kangen, the pain has lessened and he coughs less. I begin proposing Kangen water now to other sick people.",
        para3: "My eyes are opened now. I saw the KANGEN light.",
        name: "Diane Anaba",
        place: "Cameroon, Canada",
        email: "tsogoanaba@gmail.com",
        phone: "+237-677-645-674"
      },
      {
        img: "https://drive.google.com/uc?export=view&id=12A3Z3uMBnRPK4Nb5qOfbbiKBWdzRYBmf",
        header: "Improved blood tests, more immune, bottled water savings",
        para1: "2 years ago, I was overwhelmed with my work and managing my life, no time for sports and how worried I was \
        getting about my health. My general blood tests was not too good. I was feeling tired all the time, \
        couldn't sleep well, obesity and swollen feet.",
        para2: "It is now 1.5 years since I bought my K8 Machine and consuming solely KANGEN water. I must admit I \
        could only experience good results. My blood tests continued to improve and I am now within the required \
        range. I sleep well and i feel more energetic. I lost around 10 kg and the swelling has reduced.",
        para3: "My whole family is enjoying the benefits of KANGEN water. We love the taste. My 3 kids used to be \
        vulnerable to the climate change. Now they are more immune to the seasonal flu. My hubby is also \
        feeling more energetic and his body pain has lessen.  We have minimised our spending on medicines \
        and saved, I would say, approx. U$600 annually on bottled water.",
        name: "Neena Soorjun",
        place: "Melrose, Mauritius",
        email: "neenasoorjun@gmail.com",
        phone: "+230-5719-1524"
      },
      {
        img: "https://drive.google.com/uc?export=view&id=1g48mkgFQb-mLlrQRPgqQWxo4LDybulrM",
        header: "Pains disappeared, menstrual remedy, body revitalized",
        para1: "I learned about KANGEN WATER in 2020 in GHANA. As I was suffering from menstruation problems, terrible back pain, I immediately agreed to test Kangen water, for a month.",
        para2: "In less than 2 weeks, things took a different turn, I started to feel positively the KANGEN effects in my body and it was unbelievable - the aches and pains disappeared. In short, I had a new body for the better! My menstrual cycle is back to normal...no back pain or cycle abnormalities. KANGEN WATER had revitalized my body. I recommend this KANGEN WATER to you, for the good health of all your body cells. Today, in CANADA, KANGEN water has become our water for life, with our K8. And I now wholeheartedly hope to help people discover KANGEN water back in Congo, my birthplace!",
        para3: "THANK YOU KANGEN WATER, CHANGE YOUR WATER, CHANGE YOUR LIFE and DRINK KANGEN WATER.",
        name: "Jolie Bampengesha",
        place: "London, Canada",
        email: "jaassilu@gmail.com",
        phone: "+1-519-282-6290"
      }
    ];
    constructor(private dbService: DbService) { }

    ngOnInit() { 
      this.dbService.getWebsiteName().subscribe(
        res => {
          this.websiteName = (res.body as any).websiteName;
          if (this.websiteName == "kangenkenya") {
            $(".main-container").html('<div style="padding: 50px; text-align: center">coming soon</div>');
          }
        },
        err => {
          console.log(err)
        }
      );
    }
}
