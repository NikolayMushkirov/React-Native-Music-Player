import { TouchableOpacity } from "react-native";

import IonIcons from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import { colors } from "../ui/colors";

const ShareButton = () => {
  return (
    <TouchableOpacity>
      <IonIcons
        name="share-social-outline"
        color={colors.white}
        size={23}
        onPress={() => alert("pressed")}
      />
    </TouchableOpacity>
  );
};
const HeartButton = () => {
  return (
    <TouchableOpacity>
      <IonIcons
        name="heart-outline"
        color={colors.white}
        size={23}
        onPress={() => alert("pressed")}
      />
    </TouchableOpacity>
  );
};
const ShuffleButton = ({
  shuffle,
  handleChangeShuffle,
}: {
  shuffle: boolean;
  handleChangeShuffle: () => void;
}) => {
  return (
    <TouchableOpacity>
      <MaterialIcon
        name="shuffle"
        color={shuffle ? colors.white : colors.grey}
        size={23}
        onPress={handleChangeShuffle}
      />
    </TouchableOpacity>
  );
};
const SkipBackButton = () => {
  return (
    <TouchableOpacity>
      <IonIcons
        name="play-skip-back-outline"
        size={35}
        color={colors["blue-color-4"]}
      />
    </TouchableOpacity>
  );
};
const SkipForwardButton = () => {
  return (
    <TouchableOpacity>
      <IonIcons
        name="play-skip-forward-outline"
        size={35}
        color={colors["blue-color-4"]}
      />
    </TouchableOpacity>
  );
};
const PauseButton = ({ pause }: { pause: () => Promise<void> }) => {
  return (
    <TouchableOpacity>
      <IonIcons
        name="ios-pause-circle"
        size={75}
        color={colors["blue-color-4"]}
        onPress={pause}
      />
    </TouchableOpacity>
  );
};

const PlayButton = ({ play }: { play: () => Promise<void> }) => {
  return (
    <TouchableOpacity>
      <IonIcons
        name="ios-play-circle"
        size={75}
        color={colors["blue-color-4"]}
        onPress={play}
      />
    </TouchableOpacity>
  );
};
const EqualizerButton = () => {
  return (
    <TouchableOpacity>
      <MaterialIcon
        style={{ margin: 0, padding: 0 }}
        name="equalizer"
        size={23}
        color={colors.white}
      />
    </TouchableOpacity>
  );
};
const PlusButton = () => {
  return (
    <TouchableOpacity>
      <AntIcon
        style={{ margin: 0, padding: 0 }}
        name="plus"
        size={23}
        color={colors.white}
      />
    </TouchableOpacity>
  );
};

export {
  PlayButton,
  PauseButton,
  PlusButton,
  ShareButton,
  ShuffleButton,
  EqualizerButton,
  HeartButton,
  SkipBackButton,
  SkipForwardButton,
};
