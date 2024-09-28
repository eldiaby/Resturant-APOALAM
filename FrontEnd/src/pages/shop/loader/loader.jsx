import React from 'react'
import "./loader.css";

export default function Loader() {
    return (
        <div className="section-container">
            <div className="pt-36 max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
                <div className="flex items-center justify-center">
                    <div className="pt-24 flex flex-col items-center justify-center gap-8">
                        <span class="loader"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
