import { useRouter, useSegments } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

const tabs = [
    {label: 'Home', path: '/home'},
    {label: 'Notes', path: '/notes'},
    {label: 'Settings', path: '/settings'}
] as const
const FooterNav = () => {
    const router = useRouter();
    const segments = useSegments(); //["progect"]
    const activeRouter = "/" + (segments[0] || "");
  return (
    <View className="flex-row justify-around border-gray-300 py-2 bg-white">
      {/* {tabs.map(() => {
        return <View></View>
      })} */}
      {tabs.map((data, index) => (
        <Pressable
          key={index}
          // data.path === activeRouter -> this button is active
          //   "" + "" -> ` ${can use varibles like any} `
          className={`py-1 px-4 rounded-lg ${data?.path === activeRouter ? "bg-blue-600" : ""}`}
          onPress={() => {
            router.push(data?.path)
          }}
        >
          <Text className="text-2xl">{data?.label}</Text>
        </Pressable>
      ))}
    </View>
  )
}

export default FooterNav