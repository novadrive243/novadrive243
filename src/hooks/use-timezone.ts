
import { format, formatISO } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime, formatInTimeZone } from 'date-fns-tz';

// Fuseau horaire de Kinshasa (GMT+1)
export const KINSHASA_TIMEZONE = 'Africa/Kinshasa';

export const useTimezone = () => {
  /**
   * Convertit une date UTC en date dans le fuseau horaire de Kinshasa
   */
  const toKinshasaTime = (date: Date | string | number): Date => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return utcToZonedTime(dateObj, KINSHASA_TIMEZONE);
  };

  /**
   * Convertit une date du fuseau horaire de Kinshasa en UTC
   */
  const fromKinshasaTime = (date: Date | string | number): Date => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return zonedTimeToUtc(dateObj, KINSHASA_TIMEZONE);
  };

  /**
   * Formate une date dans le fuseau horaire de Kinshasa
   */
  const formatKinshasaDate = (
    date: Date | string | number,
    formatStr: string = 'dd/MM/yyyy HH:mm'
  ): string => {
    return formatInTimeZone(date, KINSHASA_TIMEZONE, formatStr);
  };

  /**
   * Obtient la date et l'heure actuelles à Kinshasa
   */
  const getCurrentKinshasaTime = (): Date => {
    return toKinshasaTime(new Date());
  };

  /**
   * Crée une nouvelle date dans le fuseau horaire de Kinshasa
   */
  const createKinshasaDate = (
    year: number,
    month: number, // 0-11
    day: number,
    hour: number = 0,
    minute: number = 0,
    second: number = 0
  ): Date => {
    // Créer une date locale
    const localDate = new Date(year, month, day, hour, minute, second);
    // Convertir en date UTC
    return zonedTimeToUtc(localDate, KINSHASA_TIMEZONE);
  };

  return {
    toKinshasaTime,
    fromKinshasaTime,
    formatKinshasaDate,
    getCurrentKinshasaTime,
    createKinshasaDate,
    KINSHASA_TIMEZONE,
  };
};
