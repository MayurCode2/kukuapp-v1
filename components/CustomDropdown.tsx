import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';

interface Option {
  category: string;
}

interface CustomDropdownProps {
  options: Option[];
  placeholder: string;
  onSelect: (selectedOption: Option) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  placeholder,
  onSelect,
}) => {
  const [search, setSearch] = useState<string>('');
  const [clicked, setClicked] = useState<boolean>(false);
  const [data, setData] = useState<Option[]>(options);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const searchRef = useRef<TextInput | null>(null);

  const onSearch = (searchText: string) => {
    if (searchText !== '') {
      let tempData = options.filter((item) => {
        return item.category.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(options);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 0.5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
          backgroundColor: '#F5D20A',
        }}
        onPress={() => {
          setClicked(!clicked);
        }}
      >
        <Text className=' text-xl font-bold' >
          {selectedOption ? selectedOption.category : placeholder}
        </Text>
        {clicked ? (
          <Image source={require("../assets/upload.png")} style={{ width: 20, height: 20 }} />
        ) : (
          <Image source={require('../assets/dropdown.png')} style={{ width: 20, height: 20 }} />
        )}
      </TouchableOpacity>
      {clicked ? (
        <View
          style={{
            elevation: 5,
            marginTop: 20,
            height: 300,
            alignSelf: 'center',
            width: '90%',
            backgroundColor: '#F5D20A',
            borderRadius: 10,
          }}
        >
          <TextInput
            placeholder="Search.."
            value={search}
            ref={(input) => (searchRef.current = input)}
            onChangeText={(txt) => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={{
              width: '90%',
              height: 50,
              alignSelf: 'center',
              borderWidth: 0.2,
              borderColor: '#8e8e8e',
              borderRadius: 7,
              marginTop: 20,
              paddingLeft: 20,
            }}
          />

          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '85%',
                    alignSelf: 'center',
                    height: 50,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: '#8e8e8e',
                  }}
                  onPress={() => {
                    setSelectedOption(item);
                    setClicked(false);
                    onSearch('');
                    setSearch('');
                    onSelect(item);
                  }}
                >
                  <Text style={{ fontWeight: '600' }}>{item.category}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default CustomDropdown;
