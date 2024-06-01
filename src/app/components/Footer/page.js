const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content py-4 mt-auto">
            <div className="container mx-auto px-4">
                {/* <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h5 className="text-lg font-bold">Perpustakaan XYZ</h5>
                        <p className="text-sm">Jl. Contoh No. 123, Kota ABC</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="text-primary hover:underline">Tentang Kami</a>
                        <a href="#" className="text-primary hover:underline">Layanan</a>
                        <a href="#" className="text-primary hover:underline">Kontak</a>
                    </div>
                </div> */}
                <div className="text-center mt-4">
                    <p className="text-sm">&copy; 2024 Perpustakaan SMPN 1 Warungkiara. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
