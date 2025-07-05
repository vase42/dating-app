import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Card from './Card';

const FeedScreen = () => {
  const cardData = [
    {
      id: 1,
      title: "Sarah, 25",
      description: "Love hiking and coffee ☕",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b287?w=400&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Emma, 23",
      description: "Yoga instructor 🧘‍♀️",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Jessica, 27",
      description: "Photographer & traveler 📸",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop"
    },
    {
      id: 4,
      title: "Amanda, 24",
      description: "Dog lover & bookworm 📚",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop"
    },
    {
      id: 5,
      title: "Lisa, 26",
      description: "Fitness enthusiast 💪",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop"
    }
  ];

  const handleSwipeLeft = (item) => {
    console.log('Passed on:', item.title);
  };

  const handleSwipeRight = (item) => {
    console.log('Liked:', item.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.feedContainer}>
        <Card 
          data={cardData}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  feedContainer: {
    flex: 1,
  },
});

export default FeedScreen;