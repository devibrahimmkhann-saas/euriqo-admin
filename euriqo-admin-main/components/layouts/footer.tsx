const Footer = () => {
    return (
        <div className="mt-auto p-6 pt-5 text-center dark:text-white-dark ltr:sm:text-left rtl:sm:text-right">
            © {new Date().getFullYear()}. Euriqo Admin All rights reserved.
        </div>
    );
};

export default Footer;
