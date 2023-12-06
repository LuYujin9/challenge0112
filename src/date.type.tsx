export type Country = {
  id: string;
  name: string;
  /**
   * TODO: please move this out of the country objects.
   * If the list is fetched from a backend, you will always receive them without this field
   * and thus keeping this state outside of the data objects makes it a lot easier
   * to deal with updates, refetches, etc.
   */
  isSelected: boolean;
};
