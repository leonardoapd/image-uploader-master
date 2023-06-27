using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace image_uploader_backend.Settings
{
    public class MongoDBSettings
    {
        public string? Password { get; set; }

        public string ConnectionString
        {
            get
            {
                //Use this connection string to connect with mongodb atlas cluster
                return $"mongodb+srv://leonardoapd:{Password}@clusterwebdev.5d1hn.mongodb.net/?retryWrites=true&w=majority";
                //return $"mongodb://{User}:{Password}@{Host}:{Port}";
            }
        }
    }
}