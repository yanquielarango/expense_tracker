import { Text, TouchableOpacity} from 'react-native'
import {icon} from "@/constants/icon";



type Props = {
    onPress: () => void,
    onLongPress: () => void,
    isFocused: boolean,
    label: any,
    routeName: string,
}

export const TabBarButton = (props: Props) => {
    const { label, isFocused, onLongPress, onPress, routeName} = props
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1  justify-center items-center gap-1"
        >
            {icon[routeName] ({
                color: isFocused ? '#673ab7' : '#222',
            })}
            <Text style={{ color: isFocused ? "#673ab7" : "#222" }} >
                {label}
            </Text>
        </TouchableOpacity>
    )
}
export default TabBarButton
