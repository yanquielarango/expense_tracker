import {LayoutChangeEvent, View} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarButton from "@/components/TabBarButton";
import React, {useEffect} from "react";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const [dimensions, setDimensions] = React.useState({heigth: 20, width: 100});

    const buttonWidth = dimensions.width / state.routes.length;

    useEffect(() => {
        tabPositionX.value = withTiming(buttonWidth * state.index, {
            duration: 300,
        })
    },[state.index])


    const onTabBarLayout = (e: LayoutChangeEvent) => {
            setDimensions({
                heigth: e.nativeEvent.layout.height,
                width: e.nativeEvent.layout.width,
            })
    }

    const tabPositionX = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: tabPositionX.value}]
        }
    })


    return (
        <View className="flex-row  pt-4 pb-2 bg-white " onLayout={onTabBarLayout}>
            <Animated.View  style={[animatedStyle,{
                width: buttonWidth / 2, height:3, position: "absolute", top: 0, left: 20, backgroundColor: '#673ab7'
            }]}/>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.key}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        label={label}
                        routeName={route.name}
                    />
                );
            })}
        </View>
    );
}