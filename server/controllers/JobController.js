import Job from '../models/Job.js'

export async function getJobList(req, res) {
    try {
        const jobs = await Job.find({});
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({message: "Failed to get jobs."});
    }
}

export async function getAvailableJobs(req, res){
    try {
        const jobs = await Job.find({status: 'Available'});
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({message: "Failed to get available jobs."})
    }
}
export async function getJobByCategory(req, res) {
    try {
        const {categoryId} = req.params;
        const jobs = await Job.find({category: categoryId});
        if(!jobs || jobs.length === 0) {
            return res.status(404).json({message: "No jobs were found for this category."});
        }
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({message: "Failed to get jobs."});
    }
}

export async function getJobDetails(req, res){
    try {
        const {id} = req.params;
        const job = await Job.findById(id);
        if(!job) {
            return res.status(404).json({message: "Job not found."});
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({message: "Failed to get job details."});
    }
}

export async function getApplicantsList(req, res){
    try {
        const {jobId} = req.params;
        const job = await Job.findById(jobId).populate('applicants');
        if(!job) {
            return res.status(404).json({message: "Job not found."});
        }
        res.status(200).json(job.applicants);
    } catch (error) {
        res.status(500).json({message: "Failed to get applicants."});
    }
}
export async function createJob(req, res){
    try {
        const {title, description, category, price, image} = req.body;
        const jobPoster = req.user.id;
        
        if(!title || !description || !category || !price || !jobPoster) {
            return res.status(400).json({message: "Missing required fields."});
        };

        const newJob = new Job({
            title,
            description,
            category,
            price,
            image,
            jobPoster
        });

        await newJob.save();
        res.status(201).json({message: "Job created successfully."});
    } catch (error) {
        res.status(500).json({message: "Failed to create job."});
    }
}

export async function changeJobStatus(req, res){
    try {
        const {id} = req.params;
        const {status} = req.body;
        const statusOptions = ['Available', 'In Progress', 'Completed', 'Cancelled'];

        if(!statusOptions.includes(status)) {
            return res.status(400).json({message: "Invalid status value."});
        }
        const job = await Job.findByIdAndUpdate(id, {status}, {new: true});
        if(!job) {
            return res.status(404).json({message: "Job not found."});
        }
        res.status(200).json({message: "Job status updated."}, job);
    } catch (error) {
        res.status(500).json({message: "Failed to change job status."});
    }
}

export async function applyForJob(req, res){
    try {
        const {jobId} = req.params;
        const userId = req.user.id;

        const job = await Job.findById(jobId);

        if(!job) {
            return res.status(404).json({message: "Job not found."});
        }

        if(job.status !== "Available") {
            return res.status(400).json({message: "Cannot apply for this job. It is not available."});
        }
        if(job.applicants.includes(userId)) {
            return res.status(400).json({message: "You have already applied for this job."});
        }
        if(job.jobPoster.toString() === userId) {
            return res.status(400).json({message: "You cannot apply for your own job."});
        }
        job.applicants.push(userId);

        return res.status(200).json({message: "Successfully applied for the job.", job});
    } catch (error) {
        res.status(500).json({message: "Failed to apply for job."});
    }
}

export async function selectApplicant(req, res){
    try {
        const {jobId, applicantId} = req.params,
        job = await Job.findById(jobId);
        if(!job) {
            return res.status(404).json({message: "Job not found."});
        }
        if(!job.applicants.includes(applicantId)) {
            return res.status(400).json({message: "Applicant did not apply for this job."});
        }
        job.selectedApplicant = applicantId;
        job.status = "In Progress";
        await job.save();
        res.status(200).json({message: "Applicant selected successfully.", job});
    } catch (error) {
        res.status(500).json({message: "Failed to select an applicant."});
    }
}