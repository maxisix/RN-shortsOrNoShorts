import { Constants, Location, Permissions } from "expo";

export const getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  let location = await Location.getCurrentPositionAsync({});

  return {
    location,
    status
  };
};
