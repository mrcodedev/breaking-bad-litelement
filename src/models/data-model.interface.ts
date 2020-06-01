interface DataModel extends Array<{}> {
  /**
   * birthday: date of birthday of actor
   */
  birthday: string;

  /**
   * id: number id of character
   */
  id: string;

  /**
   * image: url of image
   */
  image: string;

  /**
   * name: name of character
   */
  name: string;

  /**
   * nickname: nickname of character
   */
  nickname: string;

  /**
   * active: occupation on serie of character
   */
  occupation: [];

  /**
   * playedBy: name of actress/actor
   */
  playedBy: string;

  /**
   * sessions: number of session of apparence in the serie
   */
  sessions: [];

  /**
   * status: live, die, unknown...
   */
  status: string;
}

interface DataModelAPI extends Array<{}> {
  /**
   * birthday: date of birthday of actor
   */
  birthday: string;

  /**
   * id: number id of character
   */
  char_id: string;

  /**
   * image: url of image
   */
  img: string;

  /**
   * name: name of character
   */
  name: string;

  /**
   * nickname: nickname of character
   */
  nickname: string;

  /**
   * active: occupation on serie of character
   */
  occupation: [];

  /**
   * playedBy: name of actress/actor
   */
  portrayed: string;

  /**
   * sessions: number of session of apparence in the serie
   */
  appearance: [];

  /**
   * status: live, die, unknown...
   */
  status: string;
}

export {DataModel, DataModelAPI};
