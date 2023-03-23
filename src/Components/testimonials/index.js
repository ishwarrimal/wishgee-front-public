import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./style.css";
import { Carousel } from 'react-responsive-carousel';

const feedbackData = [{
    name: 'Rudranil Chakrabarty',
    desig: 'Software Engineer',
    testis: 'I absolutely love the idea behind this site. Often we ask others before buying anything for thier opinion and many times, with multiple opinions, things get real confusing. With a site like wishGee, no such confusions will ever be created. I will definitely recommend WishGee to my friends and family'
},
{
    name: 'Biswanath Tewari',
    desig: 'Software Engineer',
    testis: 'I was just trying out WishGee and I must say that the recommendation I got was very accurate. I was planing to buy a new phone for quite some time so I did my research accordingly, and to my surprise, WishGee suggested me the very same phone that I was planing to buy.'
},
{
    name: 'SK. Arko',
    desig: 'Student',
    testis: 'I was looking for a wireless earphone. I tried seraching myself but ended with tens of options which confused me even more. Then I tried WishGee and it gave me just a single accurate result, all I had to do ws tell my budget and my requirements. WishGee is highly recommended if you are buying something whic has tens of options. Thank you WishGee ❤️'
},
{
    name: 'Priya Agarwal ',
    desig: 'Chartered Accountant',
    testis: 'WishGee helped me save a lot of time. I was looking to purchase a washing machine under 25,000 but was unable to finalise one as the option were a lot. WishGee recommended me a washing machine which was based on my requirements and also explained why I should purchase it. I am always going to check WishGee before purchasing anything.'
}
]

export default () => {
    return (
        <div>
            <Carousel 
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            interval={6100}
            >
            {feedbackData.map(data => 
                <div key={data.name}>

                    <div className="myCarousel flex">
                        <div className="myCarouselQuote">
                            <svg width="96" height="75" viewBox="0 0 96 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M96 53.9998L96 32.9998L84.3 32.9998L72.5813 32.9998L72.2063 32.4748C71.5688 31.5561 70.5563 29.3998 70.0875 27.9373C69.7125 26.7373 69.6563 26.1561 69.6563 23.9061C69.675 21.5436 69.7313 21.1123 70.2 19.6873C70.9875 17.2873 71.9437 15.6373 73.3875 14.0998C75.675 11.6811 79.0875 9.78731 82.95 8.75606L84.5438 8.34356L82.7437 4.18106L80.9625 0.018556L80.3812 0.131056C78.8625 0.412306 75.1125 1.59356 73.3125 2.36231C63.2813 6.58106 56.7 14.5498 54.7688 24.8436C54.0563 28.5748 54 30.6561 54 53.1186L54 74.9998L75 74.9998L96 74.9998L96 53.9998Z" fill="#FFC107"/>
                                <path d="M42 53.9998L42 32.9998L30.3 32.9998L18.5813 32.9998L18.2063 32.4748C17.5688 31.5561 16.5563 29.3998 16.0875 27.9373C15.7125 26.7373 15.6563 26.1561 15.6563 23.9061C15.675 21.5436 15.7313 21.1123 16.2 19.6873C16.9875 17.2873 17.9437 15.6373 19.3875 14.0998C21.675 11.6811 25.0875 9.78731 28.95 8.75606L30.5438 8.34356L28.7437 4.18106L26.9625 0.018556L26.3812 0.131056C24.8625 0.412306 21.1125 1.59356 19.3125 2.36231C9.28125 6.58106 2.7 14.5498 0.768751 24.8436C0.0562502 28.5748 2.67842e-06 30.6561 4.64215e-06 53.1186L6.55507e-06 74.9998L21 74.9998L42 74.9998L42 53.9998Z" fill="#FFC107"/>
                            </svg>
                        </div>
                        <div className="myCarouselText">
                            <p>
                            {data.testis}
                            </p>
                            <h3>{data.name}</h3>
                            <h4>{data.desig}</h4>
                        </div>
                    </div>
                </div>
            )}
        </Carousel>
        </div>
    );
}