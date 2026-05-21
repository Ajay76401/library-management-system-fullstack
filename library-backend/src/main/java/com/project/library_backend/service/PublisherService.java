    package com.project.library_backend.service;

    import com.project.library_backend.entity.Publisher;
    import com.project.library_backend.repository.PublisherRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.List;

    @Service
    public class PublisherService {


        @Autowired
        private PublisherRepository repo;

        public Publisher addPublisher(Publisher p) {
            return repo.save(p);
        }

        public Publisher updatePublisher(int id, Publisher p){
            Publisher publisher = repo.findById(id).orElseThrow();
            publisher.setName(p.getName());
            publisher.setAddress(p.getAddress());
            publisher.setPhone(p.getPhone());
           return  repo.save(publisher);
        }

        public void removePublisher(int id) {
            repo.deleteById(id);
        }

        public List<Publisher> getPublisher() {
            return repo.findAll();
        }
    }
