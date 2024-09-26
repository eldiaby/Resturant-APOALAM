import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer xl:px-24 py-10 px-4 text-base-content bg-base-100">
        <aside>
          <img src="/logo.png" alt="Logo" className="w-32 mb-3" />
          <p className="my-3 md:w-40">
            Savor the artistry where every dish is a culinary masterpiece
          </p>
        </aside>
        <nav>
          <header className="footer-title text-black">Useful links</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Events</a>
          <a className="link link-hover">Blogs</a>
          <a className="link link-hover">FAQ</a>
        </nav>
        <nav>
          <header className="footer-title">Main Menu</header>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Offers</a>
          <a className="link link-hover">Menus</a>
          <a className="link link-hover">Reservation</a>
        </nav>
        <nav>
          <header className="footer-title">Contact Us</header>
          <a className="link link-hover">example@email.com</a>
          <a className="link link-hover">+64 958 248 966</a>
          <a className="link link-hover">Social media</a>
        </nav>
      </footer>
      <hr />
      <footer className="footer items-center xl:px-24 px-4 py-4 mt-2">
        <aside className="items-center grid-flow-col">
          <p>Copyright © 2023 - All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:text-blue-500 hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:text-[#FF0000] hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:text-blue-600 hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:text-pink-500 hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 2.163c3.207 0 3.589.012 4.852.07 1.185.058 1.962.245 2.41.45.502.22.859.49 1.261.99.398.497.698.976.92 1.486.21.475.37 1.044.433 1.963.058 1.187.068 1.49.068 4.872s-.01 3.684-.068 4.872c-.063.92-.223 1.49-.433 1.963-.222.51-.521.989-.92 1.486-.402.5-.859.77-1.361.99-.448.205-1.225.392-2.41.45-1.263.058-1.645.07-4.852.07s-3.589-.012-4.852-.07c-1.185-.058-1.962-.245-2.41-.45-.502-.22-.859-.49-1.261-.99-.398-.497-.698-.976-.92-1.486-.21-.475-.37-1.044-.433-1.963-.058-1.187-.068-1.49-.068-4.872s.01-3.684.068-4.872c.063-.92.223-1.49.433-1.963.222-.51.521-.989.92-1.486.402-.5.859-.77 1.361-.99.448-.205 1.225-.392 2.41-.45C8.411 2.175 8.793 2.163 12 2.163zm0 1.45c-3.164 0-3.55.012-4.795.07-1.01.048-1.623.224-2.031.377-.493.206-.746.454-.916.674-.17.22-.4.69-.5 1.17-.1.481-.2 1.09-.245 1.844-.057 1.23-.067 1.439-.067 4.473 0 3.035.011 3.243.067 4.473.045.754.145 1.363.245 1.844.1.48.33.95.5 1.17.17.22.423.468.916.674.408.153 1.021.329 2.031.377 1.245.058 1.631.07 4.795.07s3.55-.012 4.795-.07c1.01-.048 1.623-.224 2.031-.377.493-.206.746-.454.916-.674.17-.22.4-.69.5-1.17.1-.481.2-1.09.245-1.844.057-1.23.067-1.439.067-4.473 0-3.035-.011-3.243-.067-4.473-.045-.754-.145-1.363-.245-1.844-.1-.48-.33-.95-.5-1.17-.17-.22-.423-.468-.916-.674-.408-.153-1.021-.329-2.031-.377-1.245-.058-1.631-.07-4.795-.07zm0 6.103c2.109 0 3.849 1.74 3.849 3.849 0 2.11-1.74 3.849-3.849 3.849-2.109 0-3.849-1.74-3.849-3.849 0-2.109 1.74-3.849 3.849-3.849zm0 1.45c-1.313 0-2.399 1.086-2.399 2.399 0 1.313 1.086 2.399 2.399 2.399 1.313 0 2.399-1.086 2.399-2.399 0-1.313-1.086-2.399-2.399-2.399zm5.205-5.555c.573 0 1.042.469 1.042 1.042 0 .573-.469 1.042-1.042 1.042s-1.042-.469-1.042-1.042c0-.573.469-1.042 1.042-1.042z"></path>
            </svg>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
