 public static class PasswordDecryptor
    {
        private static string[] ConvertToArray(string content)
        {
            var stringArray = content.Trim('[', ']')
                  .Split(",")
                  .Select(x => x.Trim('"'))
                  .ToArray();
            if (!content.Contains("[") || !content.Contains("]") || stringArray.Length<=1) return new string[] { "1","1" };            
            return stringArray;
        }

        private static string TrimKey(string key)
        {
            return key.Split("-")[0];
        }

        private static List<int> GetAsciiArray(string[] codesArray, string key)
        {
            List<int> resultAsciiArray = new List<int>();
            for (int i = 0; i < codesArray.Length; i++)
                resultAsciiArray.Add(Convert.ToInt32(codesArray[i]) - ((int)key[i % key.Length]));
            return resultAsciiArray;
        }

        private static string CreatePassword(List<int> resultAsciiArray)
        {
            string plainPassword = "";
            for (int i = 0; i < resultAsciiArray.Count; i++) plainPassword += (char)resultAsciiArray[i];
            return plainPassword;
        }

        public static string Decrypt(string encryptedPassword, string key)
        {
            return CreatePassword(GetAsciiArray(ConvertToArray(encryptedPassword), TrimKey(key)));
        }
    }
