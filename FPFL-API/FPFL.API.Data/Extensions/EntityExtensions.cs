using FPFL.API.Data.Domain;
using FPFL.API.Data.DTO;
using System;
using System.Linq;
using System.Reflection;

namespace FPFL.API.Data.Extensions
{
	public static class EntityExtensions
	{
		public static void CopyTo(this Item source, ItemDTO destination)
		{
			if (source == null)
				throw new ArgumentNullException(nameof(source));

			if (destination == null)
				throw new ArgumentNullException(nameof(destination));

			Type sourceType = typeof(Item);
			Type destinationType = typeof(ItemDTO);

			PropertyInfo[] properties = sourceType.GetProperties();

			foreach (PropertyInfo property in properties)
			{
				PropertyInfo destinationProperty = destinationType.GetProperty(property.Name);

				if (destinationProperty != null && destinationProperty.CanWrite)
				{
					object value = property.GetValue(source);
					destinationProperty.SetValue(destination, value);
				}
			}
		}

		public static void CopyTo(this Period source, PeriodDTO destination)
		{
			if (source == null)
				throw new ArgumentNullException(nameof(source));

			if (destination == null)
				throw new ArgumentNullException(nameof(destination));

			Type sourceType = typeof(Period);
			Type destinationType = typeof(PeriodDTO);

			PropertyInfo[] properties = sourceType.GetProperties();

			foreach (PropertyInfo property in properties)
			{
				PropertyInfo destinationProperty = destinationType.GetProperty(property.Name);

				if (destinationProperty != null && destinationProperty.CanWrite)
				{
					object value = property.GetValue(source);
					destinationProperty.SetValue(destination, value);
				}
			}
		}

		public static void CopyTo(this ItemType source, ItemTypeDTO destination)
		{
			if (source == null)
				throw new ArgumentNullException(nameof(source));

			if (destination == null)
				throw new ArgumentNullException(nameof(destination));

			Type sourceType = typeof(ItemType);
			Type destinationType = typeof(ItemTypeDTO);

			PropertyInfo[] properties = sourceType.GetProperties();

			foreach (PropertyInfo property in properties)
			{
				PropertyInfo destinationProperty = destinationType.GetProperty(property.Name);

				if (destinationProperty != null && destinationProperty.CanWrite)
				{
					object value = property.GetValue(source);
					destinationProperty.SetValue(destination, value);
				}
			}
		}

		/// <summary>
		///		This utility is intended to assist in returning only the necessary layers for the UI
		///		Without this then the GetItems returns too many layers of data and the Json serialization
		///		will error out
		/// </summary>
		/// <typeparam name="TEntity">Entity Class</typeparam>
		/// <typeparam name="TDto">DTO Class</typeparam>
		/// <param name="entity">Entity Class</param>
		/// <returns>ItemDTO Class</returns>
		/// <exception cref="ArgumentNullException"></exception>
		public static TDto ToDTO<TEntity, TDto>(this TEntity entity)
			where TEntity : class
			where TDto : new()
		{
			if (entity == null)
				throw new ArgumentNullException(nameof(entity));

			TDto dto = new TDto();

			System.Reflection.PropertyInfo[] entityProperties = typeof(TEntity).GetProperties();
			System.Reflection.PropertyInfo[] dtoProperties = typeof(TDto).GetProperties();

			foreach (var dtoProp in dtoProperties)
			{
				System.Reflection.PropertyInfo matchingEntityProp = entityProperties.FirstOrDefault(prop =>
					prop.Name == dtoProp.Name &&
					prop.PropertyType == dtoProp.PropertyType);

				if (matchingEntityProp != null)
				{
					var value = matchingEntityProp.GetValue(entity);

					// If the property is a nested entity, recursively convert it to DTO
					if (value != null && value.GetType().Namespace.StartsWith("FPFL.API.Data.Domain"))
					{
						var dtoType = typeof(EntityExtensions).GetMethod("ToDTO")?.MakeGenericMethod(value.GetType(), dtoProp.PropertyType);
						value = dtoType?.Invoke(null, new object[] { value });
					}

					dtoProp.SetValue(dto, value);
				}
			}
			return dto;
		}
	}
}
