import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaGraduationCap,
  FaHandHoldingHeart,
  FaHeart,
  FaInstagram,
  FaLinkedinIn,
  FaPaw,
  FaQuoteLeft,
  FaRegCircle,
  FaStar,
  FaStethoscope,
  FaUsers,
  FaYoutube,
} from "react-icons/fa";
import { FaBowlFood, FaPersonDress, FaTruckMedical, FaXTwitter } from "react-icons/fa6";
import {
  LuArrowRight,
  LuCheck,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuHeadset,
  LuHeartHandshake,
  LuMail,
  LuMapPin,
  LuMenu,
  LuPhoneCall,
  LuPlus,
  LuSend,
  LuX,
} from "react-icons/lu";

// Every icon the site can use, by the name templates.json stores. A new icon is added here once.
const icons: Record<string, IconType> = {
  FaBowlFood,
  FaFacebookF,
  FaGraduationCap,
  FaHandHoldingHeart,
  FaHeart,
  FaInstagram,
  FaLinkedinIn,
  FaPaw,
  FaPersonDress,
  FaQuoteLeft,
  FaStar,
  FaStethoscope,
  FaTruckMedical,
  FaUsers,
  FaXTwitter,
  FaYoutube,
  LuArrowRight,
  LuCheck,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuHeadset,
  LuHeartHandshake,
  LuMail,
  LuMapPin,
  LuMenu,
  LuPhoneCall,
  LuPlus,
  LuSend,
  LuX,
};

type Props = {
  name: string;
  className?: string;
};

export const Icon = ({ name, className }: Props) => {
  const Glyph = icons[name];
  if (!Glyph) {
    if (process.env.NODE_ENV !== "production") console.warn(`Icon "${name}" is not in components/ui/Icon.tsx`);
    return <FaRegCircle aria-hidden="true" className={className} />;
  }
  return <Glyph aria-hidden="true" focusable="false" className={className} />;
};
