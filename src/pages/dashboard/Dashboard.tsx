import "./Dashboard.css"; // Pastikan path ini sesuai dengan tempat Anda menyimpan file CSS

import bg1 from "@/assets/bg1.png";
import bg2 from "@/assets/bg2.png";

export default function Dashboard() {
    return (
        <div className="image-container">
            {/* Gambar pertama (berada di bawah) */}
            <img src={bg1} alt="Background 1" className="bg-image" />

            {/* Gambar kedua (berada di atas, dengan animasi fade in/out) */}
            <img src={bg2} alt="Background 2" className="bg-image bg-top" />
        </div>
    );
}
