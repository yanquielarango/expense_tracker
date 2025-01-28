import {
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform, TouchableOpacity,
} from "react-native";

import { InputFieldProps } from "@/types/type";
import { Icon } from "./ui/icon";

const InputField = ({
                        label,
                        icon,
                        icon2,
                        secureTextEntry = false,
                        labelStyle,
                        containerStyle,
                        inputStyle,
                        iconStyle,
                        className,
                        onPress,
                        ...props
                    }: InputFieldProps) => {
    return (
        <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "android" ? 100 : 0 }

                >

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="my-2 w-full">
                    <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
                        {label}
                    </Text>
                    <View
                        className={`flex flex-row justify-start items-center   rounded-full border border-neutral-300 focus:border-[#0286ff]  ${containerStyle}`}
                    >
                        {icon && (
                            <Icon as={icon} className={`w-6 h-6 ml-4 ${iconStyle} color-neutral-500`} />
                        )}
                        <TextInput
                            className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1  focus:border-[#0286ff] ${inputStyle} text-left`}
                            secureTextEntry={secureTextEntry}
                            {...props}
                        />
                        {icon2 && (
                           <TouchableOpacity  onPress={onPress}>
                               <Icon as={icon2} className={`w-6 h-6 ml-4 ${iconStyle} color-neutral-500 mr-5`}  />
                           </TouchableOpacity>

                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default InputField;