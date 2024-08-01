import os
import pandas as pd
import base64
import matplotlib.pyplot as plt
import seaborn as sns

job_skills_path = os.path.join(os.path.dirname(__file__), 'job_skills.csv')
linkedin_job_postings_path = os.path.join(os.path.dirname(__file__), 'linkedin_job_postings.csv')

job_skills = pd.read_csv(job_skills_path)
linkedin_job_posting  = pd.read_csv(linkedin_job_postings_path)

linkedin_job_posting = pd.merge(linkedin_job_posting, job_skills, on='job_link', how = 'inner')
linkedin_job_posting = linkedin_job_posting.dropna()
linkedin_job_posting = linkedin_job_posting.apply(lambda col: col.map(lambda s: s.lower() if isinstance(s, str) else s))
linkedin_job_posting = linkedin_job_posting.replace({' & ': ' and '}, regex=True)

def itr_skills(row):
    
    skills = row['job_skills'].split(', ')
    skills = [skills for skills in skills if len(skills) >= 3]
    
    return skills

linkedin_job_posting['skills'] = linkedin_job_posting.apply(itr_skills, axis=1)# applying function

linkedin_job_posting['skills_count'] = linkedin_job_posting['skills'].apply(len)

linkedin_job_posting.drop(['job_skills'], axis=1, inplace=True)
linkedin_job_posting = linkedin_job_posting.rename(columns={'skills': 'job_skills'})
linkedin_job_posting['search_country'] = linkedin_job_posting['search_country'].astype('category')
linkedin_job_posting['search_country'].cat.categories


us_jobs = linkedin_job_posting[linkedin_job_posting['search_country'] == 'united states'] #filtering the linkedin_job_posting DataFrame where the ‘search_country’ column is ‘united states’.
job_counts = us_jobs['job_title'].value_counts() #count of each unique job title in the us_jobs DataFrame.
top_10_us_jobs = job_counts.head(10) # new data frame, contains top 10 job titles in US


if not os.path.exists(os.path.join(os.path.dirname(__file__),'figs')):
    os.makedirs(os.path.join(os.path.dirname(__file__),'figs'))

#creating a horizontal bar graph 
top_10_us_jobs.plot(kind='barh', figsize=(10, 6), color='blue')
plt.xlabel('Number of Job Postings')
plt.ylabel('Job Title')
plt.title('Top 10 Most Demanded Job Titles in the United States')
plt.gca().invert_yaxis()  
# plt.show()
plt.tight_layout()
plt.savefig(os.path.join(os.path.dirname(__file__),'figs', 'top_10_us_jobs.png'))

uk_jobs = linkedin_job_posting[linkedin_job_posting['search_country'] == 'united kingdom']
job_counts2 = uk_jobs['job_title'].value_counts()
top_10_uk_jobs = job_counts2.head(10)

top_10_uk_jobs.plot(kind='barh', figsize=(10, 6), color='green')
plt.xlabel('Number of Job Postings')
plt.ylabel('Job Title')
plt.title('Top 10 Most Demanded Job Titles in the United Kingdom')
plt.gca().invert_yaxis()  
# plt.show()
plt.tight_layout()
plt.savefig(os.path.join(os.path.dirname(__file__),'figs', 'top_10_uk_jobs.png'))

aus_jobs = linkedin_job_posting[linkedin_job_posting['search_country'] == 'australia']
job_counts3 = uk_jobs['job_title'].value_counts()
top_10_aus_jobs = job_counts3.head(10)

top_10_aus_jobs.plot(kind='barh', figsize=(10, 6), color='red')
plt.xlabel('Number of Job Postings')
plt.ylabel('Job Title')
plt.title('Top 10 Most Demanded Job Titles in Australia')
plt.gca().invert_yaxis()  
# plt.show()
plt.tight_layout()
plt.savefig(os.path.join(os.path.dirname(__file__),'figs', 'top_10_aus_jobs.png'))

linkedin_job_posting['first_seen'] = pd.to_datetime(linkedin_job_posting['first_seen'])
linkedin_job_posting['first_seen_date'] = linkedin_job_posting['first_seen'].dt.date
# Convert to string
linkedin_job_posting['last_processed_time'] = linkedin_job_posting['last_processed_time'].astype(str)
# Remove time data
linkedin_job_posting['last_processed_time'] = linkedin_job_posting['last_processed_time'].str.split(' ').str[0]
linkedin_job_posting['last_processed_time'] = pd.to_datetime(linkedin_job_posting['last_processed_time'])
linkedin_job_posting['process_duration'] = (linkedin_job_posting['last_processed_time'] - linkedin_job_posting['first_seen']).dt.days
sns.set(style="whitegrid")

# Processing Time
plt.figure(figsize=(10, 6))
sns.histplot(data=linkedin_job_posting, x='process_duration', binwidth=0.3, color = 'orange')
plt.title('Distribution of Processing Time')
plt.xlabel('Processing Time (days)')
plt.ylabel('Number of Job Postings')
# plt.show()
plt.tight_layout()
plt.savefig(os.path.join(os.path.dirname(__file__),'figs', 'process_duration.png'))


counts2 = linkedin_job_posting['job_type'].value_counts()


fig, ax = plt.subplots()
wedges, _ = ax.pie(counts2, startangle=90, colors=['#40E0D0','#FFD700','#FF6347'])


centre_circle = plt.Circle((0,0),0.70,fc='white')
fig = plt.gcf()
fig.gca().add_artist(centre_circle)


ax.axis('equal')  


labels = [f'{i} - {j} ({j/counts2.sum()*100:.1f}%)' for i,j in zip(counts2.index, counts2)]
plt.legend(wedges, labels,
          title="Job Types",
          loc="center left",
          bbox_to_anchor=(1, 0, 0.5, 1))

plt.title("Distribution of Job Types in LinkedIn Postings")
# plt.show()
plt.tight_layout()
plt.savefig(os.path.join(os.path.dirname(__file__),'figs', 'job_types.png'))
