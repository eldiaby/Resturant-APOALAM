/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <img src="/images/home/testimonials/testimonials.png" alt="" />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            {/* <p className="subtitle">Testimonials</p> */}
            <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-xl rounded-lg">
              <h2 className="text-4xl font-extrabold text-center text-green-700 mb-6">
                A Message from Our Chef
              </h2>
              <blockquote className="text-lg text-gray-800 mb-6 leading-relaxed text-center italic">
                "Dear Valued Guests,
                <br />
                Welcome to Apoallam Restaurant! As your head chef, it’s my honor
                to create dishes that not only nourish but also bring joy to
                your dining experience. Each meal is crafted with the finest,
                locally sourced ingredients and a passion for culinary
                excellence. My team and I believe that food is a celebration,
                and we are dedicated to making every visit memorable. Thank you
                for being a part of our culinary journey. We can’t wait to share
                our flavors with you!"
              </blockquote>
              <p className="text-lg font-semibold text-green-600 text-center">
                — Chef Mohammed Elsory
              </p>
            </div>

            {/* avater */}
            {/* 
            <div className="flex items-center gap-4 flex-wrap">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img src="/images/home/testimonials/testimonial1.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img src="/images/home/testimonials/testimonial2.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img src="/images/home/testimonials/testimonial3.png" />
                  </div>
                </div>
              </div> */}

            {/* <div className="space-y-1">
                <h5 className="text-lg font-semibold">Customer Feedback</h5>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />{" "}
                  <span className="font-medium">4.9</span>{" "}
                  <span className="text-[#807E7E]">(18.6k Reviews)</span>
                </div>
              </div>
             </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
