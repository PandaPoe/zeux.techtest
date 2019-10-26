using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Zeux.Test.Models;
using Zeux.Test.Repositories;

namespace Zeux.Test.Services
{
    public class AssetService: IAssetService
    {
        private readonly IAssetRepository _repository;

        public AssetService(IAssetRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Asset>> Get()
        {
            string[] replacements = { "apple", "banana", "orange" };

            List<int> replacementIndexes = new List<int>();
            List<Asset> availableAssets =  (await _repository.Get()).ToList();

            var random = new Random();

            foreach (var replacement in replacements)
            {
                int randomReplacementIndex = random.Next(0, availableAssets.Count() - 1);
                while (replacementIndexes.Contains(randomReplacementIndex))
                {
                    randomReplacementIndex = random.Next(0, availableAssets.Count() - 1);
                }
                replacementIndexes.Add(randomReplacementIndex);
                availableAssets[randomReplacementIndex].Name = replacement;
            }

            return availableAssets;
        }

        public async Task<IEnumerable<Asset>> Get(string type)
        {
            return await _repository.Get(type);
        }

        public async Task<IEnumerable<AssetType>> GetTypes()
        {
            return await _repository.GetTypes();
        }
    }
}
