using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace image_uploader_backend.Settings
{
    public class FireStorageSettings
    {
        public string? ApiKey { get; set; }
        public string? StorageBucket { get; set; }
        public string? AuthEmail { get; set; }
        public string? AuthPassword { get; set; }
    }
}