import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Card = ({ 
  data = [], 
  onSwipeLeft = () => {}, 
  onSwipeRight = () => {},
  renderCard = null 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const resetPosition = () => {
    position.setValue({ x: 0, y: 0 });
    rotate.setValue(0);
    opacity.setValue(1);
  };

  const forceSwipe = (direction) => {
    const x = direction === 'right' ? screenWidth : -screenWidth;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction) => {
    const item = data[currentIndex];
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    rotate.setValue(0);
    opacity.setValue(1);
    setCurrentIndex(currentIndex + 1);
  };

  const onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: position.x, translationY: position.y } }],
    { 
      useNativeDriver: false,
      listener: (event) => {
        const { translationX } = event.nativeEvent;
        rotate.setValue(translationX / 10);
        opacity.setValue(1 - Math.abs(translationX) / screenWidth);
      }
    }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === 5) { // END state
      const { translationX, velocityX } = event.nativeEvent;
      
      if (Math.abs(translationX) > screenWidth * 0.25 || Math.abs(velocityX) > 500) {
        forceSwipe(translationX > 0 ? 'right' : 'left');
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
        Animated.spring(rotate, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
        Animated.spring(opacity, {
          toValue: 1,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  const getCardStyle = () => {
    const rotateZ = rotate.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-30deg', '0deg', '30deg'],
    });

    return {
        transform: [
          { translateX: position.x },
          { translateY: position.y },
          { rotate: rotateZ },
        ],
        opacity: opacity,
      };      
  };

  const renderCards = () => {
    if (currentIndex >= data.length) {
      return (
        <View style={styles.noMoreCards}>
          <Text style={styles.noMoreText}>No more cards!</Text>
        </View>
      );
    }

    return data.map((item, index) => {
      if (index < currentIndex) {
        return null;
      }

      if (index === currentIndex) {
        return (
          <PanGestureHandler
            key={item.id || index}
            onGestureEvent={onPanGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Animated.View style={[styles.card, getCardStyle()]}>
              {renderCard ? renderCard(item) : (
                <DefaultCard item={item} />
              )}
            </Animated.View>
          </PanGestureHandler>
        );
      }

      return (
        <Animated.View 
          key={item.id || index} 
          style={[
            styles.card, 
            { 
              zIndex: -index,
              transform: [
                { scale: 1 - (index - currentIndex) * 0.05 },
                { translateY: (index - currentIndex) * -10 }
              ]
            }
          ]}
        >
          {renderCard ? renderCard(item) : (
            <DefaultCard item={item} />
          )}
        </Animated.View>
      );
    }).reverse();
  };

  return (
    <View style={styles.container}>
      {renderCards()}
    </View>
  );
};

const DefaultCard = ({ item }) => (
  <View style={styles.defaultCard}>
    {item.image && (
      <Image source={{ uri: item.image }} style={styles.cardImage} />
    )}
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.title || 'Card Title'}</Text>
      <Text style={styles.cardDescription}>{item.description || 'Card Description'}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    position: 'absolute',
    width: screenWidth * 0.9,
    height: screenHeight * 0.7,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  defaultCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  noMoreCards: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noMoreText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

export default Card;