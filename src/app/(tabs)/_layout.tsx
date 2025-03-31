import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, Redirect } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';


import Colors from '@/constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#191919',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color }) => ( <TabBarIcon name="briefcase" color={color} />
          ),
        }}
      />

      {/*<Tabs.Screen
        name="posting"
        options={{
          title: 'Posts',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
           //search icon for searching stuffs
           headerRight: () => (
            <Link href="/search" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="search"
                    size={18}
                    color="gray"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />*/}

      <Tabs.Screen
        name="network"
        options={{
          title: 'My Goal',
          tabBarIcon: ({ color }) => <TabBarIcon name="check" color={color} />,
        }}
      />

      {/*<Tabs.Screen
        name="new-post"
        options={{
          title: 'Post',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="plus-square" color={color} />
          ),
        }}
      />*/}

      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />
      
    </Tabs>
  );
}
