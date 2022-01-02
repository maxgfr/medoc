import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {urlify} from '../helpers';

type Props = {
  textStyle?: Record<string, any>;
  text: string;
  onPress: (link: string) => void;
};

export function TextMl(props: Props) {
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    var matches = props.text.match(/\bhttps?:\/\/\S+/gi);
    var text_without_link = urlify(props.text);
    text_without_link = text_without_link.replace(
      "Plus d'informations en cliquant ici",
      '',
    );
    if (matches && matches.length > 0) {
      setLink(matches[0]);
    }
    setMessage(text_without_link);
  }, [props.text]);

  return (
    <TouchableOpacity disabled={true} onPress={() => props.onPress(link)}>
      <Text style={props.textStyle}>{message}</Text>
    </TouchableOpacity>
  );
}
