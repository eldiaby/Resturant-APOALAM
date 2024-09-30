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
            <h2 className="title">About Us</h2>
            <blockquote className=" my-5 text-secondary leading-[30px]">
              Welcome to apoallam restaurant , we believe that great food brings
              people together. Our passion for culinary excellence is reflected
              in every dish we serve, crafted with love and care using the
              finest, locally sourced ingredients. Founded in 2010, our mission
              is to create a welcoming atmosphere where friends and families can
              gather to enjoy delicious meals and create lasting memories.
              Whether you’re indulging in our signature dishes or exploring new
              flavors from our seasonal menu, we aim to provide an unforgettable
              dining experience. Join us and discover the heart of
              <br />
              apoallam—where every meal is a celebration!
            </blockquote>

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
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
