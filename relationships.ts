import { Episodes } from "./models/episodes.model";
import { Series } from "./models/series.model";
import { Images } from "./models/images.model";
export const setRelationships: () => void = () => {
  Images.belongsTo(Series);
  Series.hasMany(Images);
  Series.hasMany(Episodes);
  Episodes.belongsTo(Series);
};
