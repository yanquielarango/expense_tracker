import { icons } from 'lucide-react-native';


const Icon = ({ name, color, size } : {name: string, color: string, size: number}) => {
    // @ts-ignore
    const LucideIcon = icons[name];

    return <LucideIcon color={color} size={size} />;
};

export default Icon;